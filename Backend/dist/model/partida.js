"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Partida extends sequelize_1.Model {
}
Partida.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    torneo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ronda: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    jugador1_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    jugador2_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ganador_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    puntaje_j1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    puntaje_j2: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('pendiente', 'en_progreso', 'finalizada'),
        defaultValue: 'pendiente'
    },
    fecha_partida: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'partidas',
    timestamps: false
});
exports.default = Partida;
//# sourceMappingURL=partida.js.map