<<<<<<< HEAD
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';

// Importar rutas
import authRoutes from './routes/auth.routes';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARES ============

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de peticiones (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============ RUTAS ============

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    success: true,
    message: 'ArenaCore API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      success: true,
      status: 'OK',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      status: 'ERROR',
      database: 'Disconnected',
      timestamp: new Date().toISOString()
    });
  }
});

// Rutas de la API
app.use('/api/auth', authRoutes);

// ============ MANEJO DE ERRORES ============

// Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// Manejador de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Error interno del servidor'
  });
});

// ============ INICIAR SERVIDOR ============

const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
    
    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Modelos sincronizados con la base de datos');
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log(`🚀 ArenaCore Backend iniciado`);
      console.log(`🚀 Puerto: ${PORT}`);
      console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀 URL: http://localhost:${PORT}`);
      console.log('🚀 ========================================');
      console.log('');
      console.log('📍 Rutas disponibles:');
      console.log('   GET  /');
      console.log('   GET  /health');
      console.log('   POST /api/auth/register');
      console.log('   POST /api/auth/login');
      console.log('   GET  /api/auth/profile');
      console.log('   PUT  /api/auth/profile');
      console.log('   PUT  /api/auth/change-password');
      console.log('   GET  /api/auth/users');
      console.log('   GET  /api/auth/users/:id');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();

// Manejo de señales para cierre graceful
process.on('SIGINT', async () => {
  console.log('\n⚠️  Cerrando servidor...');
  await sequelize.close();
  console.log('✅ Conexión a la base de datos cerrada');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  Cerrando servidor...');
  await sequelize.close();
  console.log('✅ Conexión a la base de datos cerrada');
  process.exit(0);
});

export default app;
=======
import express, { application } from 'express'
import { Application, Request, Response } from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'


//Cargar variables de entorno
dotenv.config()

//Crear aplicacion express
const app: Application = express()
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json())

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

//Ruta raiz
app.get('/', (req, res) =>{
    res.json({
        mensaje: 'API Gestion Torneos',
        //aca iran los endpoints
    })
})

//Manejo de rutas no encotradas
app.use((req, res) =>{
    res.status(404).json({error: 'Ruta no encontrada'})
})

//Iniciar servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default app
>>>>>>> feature_server_and_router
