"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class EstadisticasJugador extends sequelize_1.Model {
}
EstadisticasJugador.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    torneos_jugados: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    torneos_ganados: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    partidas_jugadas: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    partidas_ganadas: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    puntos_totales: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    nivel: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    ranking_global: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    tableName: 'estadisticas_jugador',
    timestamps: false
});
exports.default = EstadisticasJugador;
//# sourceMappingURL=estadisticasJugador.js.map