const jwt = require('jsonwebtoken');

// Importa tu conexión a la base de datos
// Ajusta esta línea según cómo tengas configurada tu conexión
const { pool } = require('../config/database'); // o como lo tengas

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. No hay token.' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // 2. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Verificar que el usuario existe en la base de datos
    const [rows] = await pool.execute(
      'SELECT id, name, email, role FROM users WHERE id = ?',
      [decoded.id]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuario no encontrado' 
      });
    }
    
    // 4. Adjuntar usuario a la request
    req.user = rows[0];
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expirado, inicia sesión nuevamente' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: 'Token inválido' 
    });
  }
};

// Middleware para verificar roles
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'No autenticado' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'No tienes permiso para esta acción' 
      });
    }
    
    next();
  };
};

module.exports = { authMiddleware, requireRole };