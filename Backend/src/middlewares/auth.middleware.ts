import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../model/usuario';

// Extender el tipo Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        nombre?: string;
        apellido?: string;
        pais?: string;
      };
    }
  }
}

// Middleware principal de autenticación
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Acceso denegado. No hay token'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // 2. Verificar token
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET no está definido');
    }
    
    const decoded: any = jwt.verify(token, secret);
    
    // 3. Verificar que el usuario existe y está activo
    const user = await Usuario.findOne({
      where: { 
        id: decoded.id,
        activo: true 
      }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado o inactivo'
      });
    }
    
    // 4. Adjuntar usuario a la request (sin password_hash)
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
      return res.status(401).json({
        success: false,
        message: 'Token expirado, inicia sesión nuevamente'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Error al verificar autenticación'
    });
  }
};

// Middleware opcional: verificar que el usuario es el mismo del recurso
export const checkOwnership = (req: Request, res: Response, next: NextFunction) => {
  try {
    const resourceUserId = parseInt(req.params.id);
    const authenticatedUserId = req.user?.id;
    
    if (resourceUserId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este recurso'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verificando permisos'
    });
  }
};