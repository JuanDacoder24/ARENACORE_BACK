const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database'); // ajusta según tu config

// Generar token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// REGISTRO
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar si el email ya existe
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Este email ya está registrado' 
      });
    }
    
    // Hashear contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insertar usuario
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    // Generar token
    const token = generateToken(result.insertId);
    
    res.status(201).json({
      success: true,
      message: 'Registro exitoso',
      data: {
        user: { id: result.insertId, name, email },
        token
      }
    });
    
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor' 
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, role FROM users WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales incorrectas' 
      });
    }
    
    const user = rows[0];
    
    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Credenciales incorrectas' 
      });
    }
    
    // Generar token
    const token = generateToken(user.id);
    
    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role 
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error en el servidor' 
    });
  }
};

// OBTENER PERFIL (ruta protegida de ejemplo)
const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
};

module.exports = { register, login, getProfile };