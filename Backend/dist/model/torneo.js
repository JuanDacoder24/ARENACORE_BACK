"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Torneo extends sequelize_1.Model {
}
Torneo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    juego_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    organizador_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('publico', 'privado'),
        defaultValue: 'publico'
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('abierto', 'en_progreso', 'finalizado', 'cancelado'),
        defaultValue: 'abierto'
    },
    max_participantes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    participantes_actuales: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    precio_inscripcion: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    premio_total: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    reglas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    tableName: 'torneos',
    timestamps: false
});
exports.default = Torneo;
//# sourceMappingURL=torneo.js.map