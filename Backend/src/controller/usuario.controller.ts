<<<<<<< HEAD
import type { Request, Response } from "express";
import Usuario from "../model/usuario";
import jwt from "jsonwebtoken";

// ============ FUNCIÓN PARA GENERAR TOKEN ============
const generateToken = (userId: number, username: string, email: string): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
  }
  
  return jwt.sign(
    { 
      id: userId,
      username,
      email 
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// ============ CRUD BÁSICO ============
=======
import type { Request, Response } from "express"
import Usuario from "../model/usuario" 
>>>>>>> feature_server_and_router

export const findAll = async (_req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll()
    return res.status(200).json(usuarios)
  } catch (error) {
    return res.status(500).json({ message: "Error listando usuarios" })
  }
}

export const findById = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    return res.status(200).json(usuario)
  } catch {
    return res.status(500).json({ message: "Error obteniendo usuario" })
  }
}

export const post = async (req: Request, res: Response) => {
  try {
    const creado = await Usuario.create(req.body)
    return res.status(201).json(creado)
  } catch {
    return res.status(400).json({ message: "Error creando usuario" })
  }
}

export const put = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    await usuario.update(req.body)
    return res.status(200).json(usuario)
  } catch {
    return res.status(400).json({ message: "Error actualizando usuario" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    await usuario.destroy()
    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: "Error borrando usuario" })
  }
<<<<<<< HEAD
};

// ============ AUTENTICACIÓN ============

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, nombre, apellido, pais } = req.body;
    
    // Verificar si el email ya existe
    const existingEmail = await Usuario.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "El email ya está registrado"
      });
    }

    // Verificar si el username ya existe
    const existingUsername = await Usuario.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "El username ya está en uso"
      });
    }
    
    // Crear usuario (el hook beforeCreate hace el hash automáticamente)
    const newUser = await Usuario.create({
      username,
      email,
      password_hash: password,
      nombre,
      apellido,
      pais
    });
    
    // Generar token
    const token = generateToken(newUser.id, newUser.username, newUser.email);
    
    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          nombre: newUser.nombre,
          apellido: newUser.apellido
        },
        token
      }
    });
    
  } catch (error: any) {
    console.error("Error en register:", error);
    
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "El email o username ya están registrados"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Error al registrar usuario"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const user = await Usuario.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }
    
    // Verificar contraseña
    const isValidPassword = await user.verifyPassword(password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }
    
    // Generar token
    const token = generateToken(user.id, user.username, user.email);
    
    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          avatar_url: user.avatar_url,
          pais: user.pais
        }
      }
    });
    
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      message: "Error al iniciar sesión"
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // El usuario viene del middleware authMiddleware
    const userId = (req as any).user.id;
    
    const user = await Usuario.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user // toJSON() oculta automáticamente el password_hash
    });
    
  } catch (error) {
    console.error("Error en getProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener perfil"
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { nombre, apellido, avatar_url, pais } = req.body;
    
    const user = await Usuario.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    
    // Actualizar solo campos permitidos
    await user.update({
      nombre: nombre !== undefined ? nombre : user.nombre,
      apellido: apellido !== undefined ? apellido : user.apellido,
      avatar_url: avatar_url !== undefined ? avatar_url : user.avatar_url,
      pais: pais !== undefined ? pais : user.pais
    });
    
    return res.status(200).json({
      success: true,
      message: "Perfil actualizado exitosamente",
      data: user
    });
    
  } catch (error) {
    console.error("Error en updateProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar perfil"
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;
    
    const user = await Usuario.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    
    // Verificar contraseña actual
    const isValidPassword = await user.verifyPassword(currentPassword);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Contraseña actual incorrecta"
      });
    }
    
    // Actualizar contraseña (el hook beforeUpdate hace el hash)
    await user.update({
      password_hash: newPassword
    });
    
    return res.status(200).json({
      success: true,
      message: "Contraseña actualizada exitosamente"
    });
    
  } catch (error) {
    console.error("Error en changePassword:", error);
    return res.status(500).json({
      success: false,
      message: "Error al cambiar contraseña"
    });
  }
};
=======
}
>>>>>>> feature_server_and_router
