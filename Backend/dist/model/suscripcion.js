"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Suscripcion extends sequelize_1.Model {
}
Suscripcion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    plan_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activa', 'cancelada', 'expirada'),
        defaultValue: 'activa'
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    tableName: 'suscripciones',
    timestamps: false
});
exports.default = Suscripcion;
//# sourceMappingURL=suscripcion.js.map