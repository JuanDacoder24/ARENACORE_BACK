import { Router, type Request, type Response, type NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { register, login, getProfile } from "../controller/auth.controller"; 
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
    });
  }
  return next();
};

const registerValidation = [
  body("name").trim().notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Mínimo 8 caracteres")
    .matches(/[A-Z]/).withMessage("Debe tener una mayúscula")
    .matches(/[0-9]/).withMessage("Debe tener un número"),
  validate,
];

const loginValidation = [
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password").notEmpty().withMessage("Contraseña requerida"),
  validate,
];

// Rutas
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authMiddleware, getProfile);

export default router;
