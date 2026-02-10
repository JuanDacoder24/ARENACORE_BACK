"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Juego extends sequelize_1.Model {
}
Juego.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    categoria_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    imagen_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    desarrollador: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true
    },
    max_jugadores_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    destacado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    tableName: 'juegos',
    timestamps: false
});
exports.default = Juego;
//# sourceMappingURL=juego.js.map