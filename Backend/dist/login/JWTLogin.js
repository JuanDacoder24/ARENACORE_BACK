"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJWTSecret = () => {
    // Intenta con PRIVATE_KEY primero, luego JWT_SECRET para compatibilidad
    const secret = process.env.PRIVATE_KEY || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('No se encontró PRIVATE_KEY ni JWT_SECRET en las variables de entorno');
    }
    return secret;
};
const createToken = (user, rememberMe = false) => {
    // Define la caducidad del token a 14 días si rememberMe es true, sino 1 día
    const expiration = rememberMe
        ? (0, dayjs_1.default)().add(14, 'day')
        : (0, dayjs_1.default)().add(1, 'day');
    const payload = {
        exp: expiration.unix(),
        id: user.id,
        username: user.username,
        nombre: user.nombre,
    };
    const secret = getJWTSecret();
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.createToken = createToken;
const verifyToken = (token) => {
    const secret = getJWTSecret();
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
exports.default = { createToken: exports.createToken, verifyToken: exports.verifyToken };
//# sourceMappingURL=JWTLogin.js.map