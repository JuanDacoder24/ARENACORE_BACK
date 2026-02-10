"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = exports.login = exports.register = exports.remove = exports.put = exports.post = exports.findById = exports.findAll = void 0;
const usuario_1 = __importDefault(require("../model/usuario"));
const JWTLogin_1 = require("../login/JWTLogin");
// ============ CRUD BÁSICO ============
const findAll = async (_req, res) => {
    try {
        const usuarios = await usuario_1.default.findAll();
        return res.status(200).json(usuarios);
    }
    catch (error) {
        return res.status(500).json({ message: "Error listando usuarios" });
    }
};
exports.findAll = findAll;
const findById = async (req, res) => {
    try {
        const usuario = await usuario_1.default.findByPk(req.params.id);
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        return res.status(200).json(usuario);
    }
    catch {
        return res.status(500).json({ message: "Error obteniendo usuario" });
    }
};
exports.findById = findById;
const post = async (req, res) => {
    try {
        const creado = await usuario_1.default.create(req.body);
        return res.status(201).json(creado);
    }
    catch {
        return res.status(400).json({ message: "Error creando usuario" });
    }
};
exports.post = post;
const put = async (req, res) => {
    try {
        const usuario = await usuario_1.default.findByPk(req.params.id);
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        await usuario.update(req.body);
        return res.status(200).json(usuario);
    }
    catch {
        return res.status(400).json({ message: "Error actualizando usuario" });
    }
};
exports.put = put;
const remove = async (req, res) => {
    try {
        const usuario = await usuario_1.default.findByPk(req.params.id);
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        await usuario.destroy();
        return res.status(204).send();
    }
    catch {
        return res.status(500).json({ message: "Error borrando usuario" });
    }
};
exports.remove = remove;
// ============ AUTENTICACIÓN ============
const register = async (req, res) => {
    try {
        const { username, email, password, nombre, apellido, pais } = req.body;
        // Verificar si el email ya existe
        const existingEmail = await usuario_1.default.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "El email ya está registrado"
            });
        }
        // Verificar si el username ya existe
        const existingUsername = await usuario_1.default.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "El username ya está en uso"
            });
        }
        // Crear usuario (el hook beforeCreate hace el hash automáticamente)
        const newUser = await usuario_1.default.create({
            username,
            email,
            password_hash: password,
            nombre,
            apellido,
            pais
        });
        // Generar token
        const token = (0, JWTLogin_1.createToken)(newUser, false);
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
    }
    catch (error) {
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
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await usuario_1.default.findByEmail(email);
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
        const token = (0, JWTLogin_1.createToken)(user, false);
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
    }
    catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión"
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        // El usuario viene del middleware authMiddleware
        const userId = req.user.id;
        const user = await usuario_1.default.findByPk(userId);
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
    }
    catch (error) {
        console.error("Error en getProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Error al obtener perfil"
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { nombre, apellido, avatar_url, pais } = req.body;
        const user = await usuario_1.default.findByPk(userId);
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
    }
    catch (error) {
        console.error("Error en updateProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar perfil"
        });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const user = await usuario_1.default.findByPk(userId);
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
    }
    catch (error) {
        console.error("Error en changePassword:", error);
        return res.status(500).json({
            success: false,
            message: "Error al cambiar contraseña"
        });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=usuario.controller.js.map