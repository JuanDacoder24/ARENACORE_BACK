import { Request, Response, NextFunction } from 'express';
import Usuario from '../model/usuario';
import { verifyToken } from '../login/JWTLogin';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  nombre?: string;
  apellido?: string;
  pais?: string;
}

// Extender el tipo Request de Express para incluir datos del usuario
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Acceso denegado. No hay token'
      });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar token usando JWTLogin
    const decoded = verifyToken(token);
    
    // Verificar que el usuario existe y está activo
    const user = await Usuario.findOne({
      where: { 
        id: decoded.id,
        activo: true 
      }
    });
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Usuario no encontrado o inactivo'
      });
      return;
    }
    
    // Adjuntar usuario a la request (sin password_hash)
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      pais: user.pais
    };
    
    next();
    
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token expirado, inicia sesión nuevamente'
      });
      return;
    }
    
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al verificar autenticación'
    });
  }
};

// Middleware para verificar que el usuario es propietario del recurso
export const checkOwnership = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const resourceUserId = parseInt(req.params.id);
    const authenticatedUserId = req.user?.id;
    
    if (resourceUserId !== authenticatedUserId) {
      res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este recurso'
      });
      return;
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verificando permisos'
    });
  }
};