"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.syncDatabase = exports.sequelize = exports.Partida = exports.Inscripcion = exports.Torneo = exports.Suscripcion = exports.MonedaVirtual = exports.Juego = exports.Categoria = exports.Billetera = exports.EstadisticasJugador = exports.Usuario = void 0;
const usuario_1 = __importDefault(require("./usuario"));
exports.Usuario = usuario_1.default;
const estadisticasJugador_1 = __importDefault(require("./estadisticasJugador"));
exports.EstadisticasJugador = estadisticasJugador_1.default;
const categoria_1 = __importDefault(require("./categoria"));
exports.Categoria = categoria_1.default;
const juego_1 = __importDefault(require("./juego"));
exports.Juego = juego_1.default;
const monedaVirtual_1 = __importDefault(require("./monedaVirtual"));
exports.MonedaVirtual = monedaVirtual_1.default;
const billetera_1 = __importDefault(require("./billetera"));
exports.Billetera = billetera_1.default;
const suscripcion_1 = __importDefault(require("./suscripcion"));
exports.Suscripcion = suscripcion_1.default;
const torneo_1 = __importDefault(require("./torneo"));
exports.Torneo = torneo_1.default;
const inscripcion_1 = __importDefault(require("./inscripcion"));
exports.Inscripcion = inscripcion_1.default;
const partida_1 = __importDefault(require("./partida"));
exports.Partida = partida_1.default;
// USUARIO
// Usuario <-> EstadisticasJugador 1:1
usuario_1.default.hasOne(estadisticasJugador_1.default, {
    foreignKey: 'usuario_id',
    as: 'estadisticas',
    onDelete: 'CASCADE'
});
estadisticasJugador_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});
// Usuario <-> Billetera 1:1
usuario_1.default.hasOne(billetera_1.default, {
    foreignKey: 'usuario_id',
    as: 'billetera',
    onDelete: 'CASCADE'
});
billetera_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});
// Usuario <-> Torneos como organizador 1:N
usuario_1.default.hasMany(torneo_1.default, {
    foreignKey: 'organizador_id',
    as: 'torneosOrganizados'
});
torneo_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'organizador_id',
    as: 'organizador'
});
// Usuario <-> Suscripciones 1:N
usuario_1.default.hasMany(suscripcion_1.default, {
    foreignKey: 'usuario_id',
    as: 'suscripciones',
    onDelete: 'CASCADE'
});
suscripcion_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});
// Usuario <-> Torneos a través de Inscripciones N:M
usuario_1.default.belongsToMany(torneo_1.default, {
    through: inscripcion_1.default,
    foreignKey: 'usuario_id',
    otherKey: 'torneo_id',
    as: 'torneosInscritos'
});
torneo_1.default.belongsToMany(usuario_1.default, {
    through: inscripcion_1.default,
    foreignKey: 'torneo_id',
    otherKey: 'usuario_id',
    as: 'participantes'
});
// Usuario <-> Inscripciones 1:N 
usuario_1.default.hasMany(inscripcion_1.default, {
    foreignKey: 'usuario_id',
    as: 'inscripciones',
    onDelete: 'CASCADE'
});
inscripcion_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});
// Usuario <-> Partidas como jugador 1, jugador 2 o ganador
usuario_1.default.hasMany(partida_1.default, {
    foreignKey: 'jugador1_id',
    as: 'partidasComoJugador1'
});
usuario_1.default.hasMany(partida_1.default, {
    foreignKey: 'jugador2_id',
    as: 'partidasComoJugador2'
});
usuario_1.default.hasMany(partida_1.default, {
    foreignKey: 'ganador_id',
    as: 'partidasGanadas'
});
partida_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'jugador1_id',
    as: 'jugador1'
});
partida_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'jugador2_id',
    as: 'jugador2'
});
partida_1.default.belongsTo(usuario_1.default, {
    foreignKey: 'ganador_id',
    as: 'ganador'
});
// CATEGORÍAS Y JUEGOS
// Categoria <-> Juegos 1:N
categoria_1.default.hasMany(juego_1.default, {
    foreignKey: 'categoria_id',
    as: 'juegos'
});
juego_1.default.belongsTo(categoria_1.default, {
    foreignKey: 'categoria_id',
    as: 'categoria'
});
// Juego <-> Torneos 1:N
juego_1.default.hasMany(torneo_1.default, {
    foreignKey: 'juego_id',
    as: 'torneos'
});
torneo_1.default.belongsTo(juego_1.default, {
    foreignKey: 'juego_id',
    as: 'juego'
});
// TORNEOS
// Torneo <-> Inscripciones 1:N - Relación directa adicional
torneo_1.default.hasMany(inscripcion_1.default, {
    foreignKey: 'torneo_id',
    as: 'inscripciones',
    onDelete: 'CASCADE'
});
inscripcion_1.default.belongsTo(torneo_1.default, {
    foreignKey: 'torneo_id',
    as: 'torneo'
});
// Torneo <-> Partidas 1:N
torneo_1.default.hasMany(partida_1.default, {
    foreignKey: 'torneo_id',
    as: 'partidas',
    onDelete: 'CASCADE'
});
partida_1.default.belongsTo(torneo_1.default, {
    foreignKey: 'torneo_id',
    as: 'torneo'
});
// EXPORTAR BASE DE DATOS
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
// FUNCIÓN PARA SINCRONIZAR LA BASE DE DATOS
const syncDatabase = async (force = false) => {
    try {
        await database_1.default.sync({ force });
        console.log('Base de datos sincronizada correctamente');
    }
    catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
        throw error;
    }
};
exports.syncDatabase = syncDatabase;
// FUNCIÓN PARA PROBAR LA CONEXIÓN
const testConnection = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
        return true;
    }
    catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        return false;
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=index.js.map