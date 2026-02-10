"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controller/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
        });
    }
    return next();
};
const registerValidation = [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("El nombre es requerido"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido").normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 }).withMessage("Mínimo 8 caracteres")
        .matches(/[A-Z]/).withMessage("Debe tener una mayúscula")
        .matches(/[0-9]/).withMessage("Debe tener un número"),
    validate,
];
const loginValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido").normalizeEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Contraseña requerida"),
    validate,
];
// Rutas
router.post("/register", registerValidation, auth_controller_1.register);
router.post("/login", loginValidation, auth_controller_1.login);
router.get("/profile", auth_middleware_1.authMiddleware, auth_controller_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map