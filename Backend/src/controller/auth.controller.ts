// auth.controller.ts
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { Secret } from "jsonwebtoken";
import Usuario from "../model/usuario";

const getJwtConfig = (): { secret: Secret; expiresIn: string } => {
  const secret = process.env.JWT_SECRET as Secret;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
  if (!secret) throw new Error("Falta JWT_SECRET");
  return { secret, expiresIn };
};

const generateToken = (userId: number): Promise<string> => {
  const { secret, expiresIn } = getJwtConfig();
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId },
      secret,
      { expiresIn: expiresIn as any },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      }
    );
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios (username, name, email, password)",
      });
    }

    const existing = await Usuario.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Este email ya está registrado",
      });
    }

    const existingUsername = await Usuario.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Este username ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Usuario.create({
      username,
      nombre: name,
      email,
      password_hash: hashedPassword,
    });

    const token = await generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: "Registro exitoso",
      data: {
        user: { 
          id: user.id, 
          username: user.username,
          nombre: user.nombre, 
          email: user.email 
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios (email, password)",
      });
    }

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const token = await generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        user: {
          id: user.id,
          username: user.username,
          nombre: user.nombre,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No autenticado",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error("Error en getProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};