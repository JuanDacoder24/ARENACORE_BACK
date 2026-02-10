"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controller/usuario.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Middleware de validación
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((e) => ({ field: e.param, message: e.msg }))
        });
    }
    next();
};
// Validaciones
const registerValidation = [
    (0, express_validator_1.body)('username').trim().notEmpty().withMessage('El username es requerido'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
        .matches(/[A-Z]/).withMessage('Debe tener una mayúscula')
        .matches(/[0-9]/).withMessage('Debe tener un número'),
    validate
];
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Contraseña requerida'),
    validate
];
const changePasswordValidation = [
    (0, express_validator_1.body)('currentPassword').notEmpty().withMessage('Contraseña actual requerida'),
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
        .matches(/[A-Z]/).withMessage('Debe tener una mayúscula')
        .matches(/[0-9]/).withMessage('Debe tener un número'),
    validate
];
// RUTAS PÚBLICAS
router.post('/register', registerValidation, usuario_controller_1.register);
router.post('/login', loginValidation, usuario_controller_1.login);
// RUTAS PROTEGIDAS
router.get('/profile', auth_middleware_1.authMiddleware, usuario_controller_1.getProfile);
router.put('/profile', auth_middleware_1.authMiddleware, usuario_controller_1.updateProfile);
router.put('/change-password', auth_middleware_1.authMiddleware, changePasswordValidation, usuario_controller_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map