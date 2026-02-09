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
    }
  }
}

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
};