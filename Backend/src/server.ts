import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './router/auth.routes';
import mainRouter from './router/index';
import { EstadisticasJugador, Inscripcion, Usuario } from './model';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manejo de error de JSON inválido
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ 
      success: false,
      message: 'JSON inválido' 
    });
    return;
  }
  next();
});

// Logger de peticiones (en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// RUTAS

// Health check
app.get('/health', async (_req: Request, res: Response) => {
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

// Ruta raíz
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    success: true,
    message: 'ArenaCore API - Backend de Torneos de Videojuegos',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api', mainRouter); // Todas las rutas de la API estarán bajo /api
// app.use(mainRouter);

// MANEJO DE ERRORES

// Ruta no encontrada
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: _req.path
  });
});

// Manejador de errores global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err);
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Error interno del servidor'
  });
});

// INICIAR SERVIDOR

const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    
    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados con la base de datos');
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('ArenaCore Backend - Servidor iniciado');
      console.log(`Puerto: ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\nCerrando servidor...');
  await sequelize.close();
  console.log('Conexión cerrada');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nCerrando servidor...');
  await sequelize.close();
  console.log('Conexión cerrada');
  process.exit(0);
});

// Asociación necesaria para que el include funcione
Inscripcion.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Inscripcion, { foreignKey: 'usuario_id' });

export default app;