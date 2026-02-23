import Usuario from "../model/usuario";
import { createToken } from "../login/JWTLogin";

export class UsuarioService {
  // ============ CRUD BÁSICO ============
  static async findAll() {
    return await Usuario.findAll();
  }

  static async findById(id: string) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return { error: true, status: 404, message: "Usuario no encontrado" };
    return { error: false, status: 200, data: usuario };
  }

  static async create(data: any) {
    try {
      const creado = await Usuario.create(data);
      return { error: false, status: 201, data: creado };
    } catch (e) {
      return { error: true, status: 400, message: "Error creando usuario" };
    }
  }

  static async update(id: string, data: any) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return { error: true, status: 404, message: "Usuario no encontrado" };

    try {
      await usuario.update(data);
      return { error: false, status: 200, data: usuario };
    } catch (e) {
      return {
        error: true,
        status: 400,
        message: "Error actualizando usuario",
      };
    }
  }

  static async remove(id: string) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return { error: true, status: 404, message: "Usuario no encontrado" };

    await usuario.destroy();
    return { error: false, status: 204 };
  }

  // ============ AUTENTICACIÓN ============
  static async register(data: any) {
    const { username, email, password, nombre, apellido, pais } = data;

    const existingEmail = await Usuario.findByEmail(email);
    if (existingEmail) {
      return {
        error: true,
        status: 400,
        message: "El email ya está registrado",
      };
    }

    const existingUsername = await Usuario.findByUsername(username);
    if (existingUsername) {
      return {
        error: true,
        status: 400,
        message: "El username ya está en uso",
      };
    }

    try {
      const newUser = await Usuario.create({
        username,
        email,
        password_hash: password,
        nombre,
        apellido,
        pais,
      });

      const token = createToken(newUser, false);

      return {
        error: false,
        status: 201,
        message: "Usuario registrado exitosamente",
        data: {
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            nombre: newUser.nombre,
            apellido: newUser.apellido,
          },
          token,
        },
      };
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return {
          error: true,
          status: 400,
          message: "El email o username ya están registrados",
        };
      }
      throw error;
    }
  }

  static async login(data: any) {
    const { email, password } = data;

    const user = await Usuario.findByEmail(email);
    if (!user) {
      return { error: true, status: 401, message: "Credenciales inválidas" };
    }

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return { error: true, status: 401, message: "Credenciales inválidas" };
    }

    const token = createToken(user, false);

    return {
      error: false,
      status: 200,
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
          pais: user.pais,
        },
      },
    };
  }

  static async getProfile(userId: string | number) {
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return { error: true, status: 404, message: "Usuario no encontrado" };
    }

    return { error: false, status: 200, data: user };
  }

  static async updateProfile(userId: string | number, data: any) {
    const { nombre, apellido, avatar_url, pais } = data;
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return { error: true, status: 404, message: "Usuario no encontrado" };
    }

    await user.update({
      nombre: nombre !== undefined ? nombre : user.nombre,
      apellido: apellido !== undefined ? apellido : user.apellido,
      avatar_url: avatar_url !== undefined ? avatar_url : user.avatar_url,
      pais: pais !== undefined ? pais : user.pais,
    });

    return {
      error: false,
      status: 200,
      message: "Perfil actualizado exitosamente",
      data: user,
    };
  }

  static async changePassword(userId: string | number, data: any) {
    const { currentPassword, newPassword } = data;
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return { error: true, status: 404, message: "Usuario no encontrado" };
    }

    const isValidPassword = await user.verifyPassword(currentPassword);
    if (!isValidPassword) {
      return {
        error: true,
        status: 401,
        message: "Contraseña actual incorrecta",
      };
    }

    await user.update({ password_hash: newPassword });
    return {
      error: false,
      status: 200,
      message: "Contraseña actualizada exitosamente",
    };
  }
}
