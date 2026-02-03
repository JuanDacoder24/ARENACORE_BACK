// Al inicio del archivo, antes de todo
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// 1. HELMET - Headers de seguridad HTTP
app.use(helmet());

// 2. CORS - Controla quién puede acceder a tu API
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. RATE LIMITER - Previene ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 peticiones por IP
  message: {
    success: false,
    message: 'Demasiadas peticiones, intenta de nuevo en 15 minutos'
  }
});
app.use('/api/', limiter);

// Rate limiter más estricto para login/register
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // máximo 10 intentos
  message: {
    success: false,
    message: 'Demasiados intentos de acceso, intenta en 1 hora'
  }
});

// 4. PARSEAR JSON - Con límite de tamaño
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Tus rutas van aquí...
// app.use('/api/auth', authLimiter, authRoutes);
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});