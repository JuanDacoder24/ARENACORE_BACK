import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { register, login, getProfile, updateProfile, changePassword } from '../controller/usuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Middleware de validación
const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e: any) => ({ field: e.param, message: e.msg }))
    });
  }
  next();
};

// Validaciones
const registerValidation = [
  body('username').trim().notEmpty().withMessage('El username es requerido'),
body('email').isEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener un número'),
  validate
];

const loginValidation = [
  body('usernameOrEmail').notEmpty().withMessage('Email o usuario requerido'),
  body('password').notEmpty().withMessage('Contraseña requerida'),
  validate
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Contraseña actual requerida'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener un número'),
  validate
];

// RUTAS PÚBLICAS
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// RUTAS PROTEGIDAS
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePasswordValidation, changePassword);

export default router;