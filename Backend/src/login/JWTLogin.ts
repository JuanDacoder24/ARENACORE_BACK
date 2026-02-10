import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import Usuario from '../model/usuario';

interface JWTPayload {
  exp: number;
  id: number;
  username: string;
  nombre?: string;
  iat?: number;
}

const getJWTSecret = (): string => {
  // Intenta con PRIVATE_KEY primero, luego JWT_SECRET para compatibilidad
  const secret = process.env.PRIVATE_KEY || process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('No se encontró PRIVATE_KEY ni JWT_SECRET en las variables de entorno');
  }
  
  return secret;
};

export const createToken = (user: Usuario, rememberMe: boolean = false): string => {
  // Define la caducidad del token a 14 días si rememberMe es true, sino 1 día
  const expiration = rememberMe
    ? dayjs().add(14, 'day')
    : dayjs().add(1, 'day');

  const payload: JWTPayload = {
    exp: expiration.unix(),
    id: user.id,
    username: user.username,
    nombre: user.nombre,
  };

  const secret = getJWTSecret();
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string): JWTPayload => {
  const secret = getJWTSecret();
  return jwt.verify(token, secret) as JWTPayload;
};

export default { createToken, verifyToken };
