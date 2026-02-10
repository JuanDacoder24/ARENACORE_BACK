"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwnership = exports.authMiddleware = void 0;
const usuario_1 = __importDefault(require("../model/usuario"));
const JWTLogin_1 = require("../login/JWTLogin");
const authMiddleware = async (req, res, next) => {
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
        const decoded = (0, JWTLogin_1.verifyToken)(token);
        // Verificar que el usuario existe y está activo
        const user = await usuario_1.default.findOne({
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
    }
    catch (error) {
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
exports.authMiddleware = authMiddleware;
// Middleware para verificar que el usuario es propietario del recurso
const checkOwnership = (req, res, next) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verificando permisos'
        });
    }
};
exports.checkOwnership = checkOwnership;
//# sourceMappingURL=auth.middleware.js.map