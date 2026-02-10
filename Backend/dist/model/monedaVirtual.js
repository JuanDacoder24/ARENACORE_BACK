"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class MonedaVirtual extends sequelize_1.Model {
}
MonedaVirtual.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    simbolo: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: true
    },
    tasa_usd: {
        type: sequelize_1.DataTypes.DECIMAL(10, 4),
        defaultValue: 1.0000
    },
    tasa_eur: {
        type: sequelize_1.DataTypes.DECIMAL(10, 4),
        defaultValue: 0.9200
    },
    activa: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'moneda_virtual',
    timestamps: false
});
exports.default = MonedaVirtual;
//# sourceMappingURL=monedaVirtual.js.map