import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword,
  findAll,
  findById
} from '../controller/usuario.controller';
import { authMiddleware, checkOwnership } from '../middlewares/auth.middleware';

const router = Router();

// Middleware de validación
const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// ============ VALIDACIONES ============

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('El username es requerido')
    .isLength({ min: 3, max: 50 }).withMessage('Username entre 3 y 50 caracteres'),
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener al menos un número'),
  body('nombre')
    .optional()
    .trim(),
  body('apellido')
    .optional()
    .trim(),
  body('pais')
    .optional()
    .trim(),
  validate
];

const loginValidation = [
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Contraseña requerida'),
  validate
];

const updateProfileValidation = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Nombre máximo 100 caracteres'),
  body('apellido')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Apellido máximo 100 caracteres'),
  body('avatar_url')
    .optional()
    .trim()
    .isURL().withMessage('URL de avatar inválida'),
  body('pais')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('País máximo 100 caracteres'),
  validate
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Contraseña actual requerida'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe tener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('Debe tener al menos un número'),
  validate
];

// ============ RUTAS PÚBLICAS ============

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario
 * @access  Public
 */
router.post('/register', registerValidation, register);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post('/login', loginValidation, login);

// ============ RUTAS PROTEGIDAS ============

/**
 * @route   GET /api/auth/profile
 * @desc    Obtener perfil del usuario autenticado
 * @access  Private
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Actualizar perfil del usuario autenticado
 * @access  Private
 */
router.put('/profile', authMiddleware, updateProfileValidation, updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Cambiar contraseña
 * @access  Private
 */
router.put('/change-password', authMiddleware, changePasswordValidation, changePassword);

// ============ RUTAS ADMIN (opcional - para administración) ============

/**
 * @route   GET /api/auth/users
 * @desc    Obtener todos los usuarios
 * @access  Private/Admin
 */
router.get('/users', authMiddleware, findAll);

/**
 * @route   GET /api/auth/users/:id
 * @desc    Obtener usuario por ID
 * @access  Private
 */
router.get('/users/:id', authMiddleware, findById);

export default router;