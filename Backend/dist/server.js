"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./router/auth.routes"));
const index_1 = __importDefault(require("./router/index"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// MIDDLEWARES
// CORS
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Manejo de error de JSON inválido
app.use((err, _req, res, next) => {
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
    app.use((req, _res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}
// RUTAS
// Health check
app.get('/health', async (_req, res) => {
    try {
        await database_1.default.authenticate();
        res.json({
            success: true,
            status: 'OK',
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 'ERROR',
            database: 'Disconnected',
            timestamp: new Date().toISOString()
        });
    }
});
// Ruta raíz
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'ArenaCore API - Backend de Torneos de Videojuegos',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});
// Rutas de la API
app.use('/api/auth', auth_routes_1.default);
app.use(index_1.default);
// MANEJO DE ERRORES
// Ruta no encontrada
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: _req.path
    });
});
// Manejador de errores global
app.use((err, _req, res, _next) => {
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
        await database_1.default.authenticate();
        console.log('Conexión a la base de datos exitosa');
        // Sincronizar modelos (solo en desarrollo)
        if (process.env.NODE_ENV === 'development') {
            await database_1.default.sync({ alter: true });
            console.log('Modelos sincronizados con la base de datos');
        }
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log('ArenaCore Backend - Servidor iniciado');
            console.log(`Puerto: ${PORT}`);
            console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log(`URL: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};
// Iniciar servidor
startServer();
// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('\nCerrando servidor...');
    await database_1.default.close();
    console.log('Conexión cerrada');
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\nCerrando servidor...');
    await database_1.default.close();
    console.log('Conexión cerrada');
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=server.js.map