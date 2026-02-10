"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../model/usuario"));
const JWTLogin_1 = require("../login/JWTLogin");
const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        if (!username || !name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios (username, name, email, password)",
            });
        }
        const existing = await usuario_1.default.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Este email ya está registrado",
            });
        }
        const existingUsername = await usuario_1.default.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Este username ya está registrado",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const user = await usuario_1.default.create({
            username,
            nombre: name,
            email,
            password_hash: hashedPassword,
        });
        const token = (0, JWTLogin_1.createToken)(user, false);
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
    }
    catch (error) {
        console.error("Error en register:", error);
        return res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios (email, password)",
            });
        }
        const user = await usuario_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }
        const isValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }
        const token = (0, JWTLogin_1.createToken)(user, false);
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
    }
    catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error en getProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.controller.js.map