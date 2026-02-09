<<<<<<< HEAD
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
=======
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../model/usuario";

export interface AuthUser {
  id: number;
  username: string;
  nombre: string;
  email: string;
}

// Extender el tipo Request de Express
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
>>>>>>> feature_server_and_router
    }
  }
}

<<<<<<< HEAD
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
=======
type TokenPayload = jwt.JwtPayload & { id: number };

const isTokenPayload = (payload: unknown): payload is TokenPayload => {
  return typeof payload === "object" && payload !== null && "id" in payload;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado. No hay token.",
      });
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Falta JWT_SECRET");

    const decoded = jwt.verify(token, secret);

    if (!isTokenPayload(decoded)) {
      return res.status(401).json({ success: false, message: "Token inválido" });
    }

    const user = await Usuario.findByPk(decoded.id, {
      attributes: ['id', 'username', 'nombre', 'email']
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    // Manejar el caso donde nombre puede ser undefined
    req.user = {
      id: user.id,
      username: user.username,
      nombre: user.nombre ?? '', 
      email: user.email
    };
    
    return next();
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expirado, inicia sesión nuevamente",
      });
    }

    return res.status(401).json({ success: false, message: "Token inválido" });
  }
};

export const requireRole = (...roles: string[]): (req: Request, res: Response, next: NextFunction) => void | Response => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "No autenticado" });
    }
    return next();
  };
>>>>>>> feature_server_and_router
};