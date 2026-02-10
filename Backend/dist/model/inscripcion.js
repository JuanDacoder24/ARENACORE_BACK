"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Inscripcion extends sequelize_1.Model {
}
Inscripcion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    torneo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        defaultValue: 'pendiente'
    },
    fecha_inscripcion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    tableName: 'inscripciones',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['torneo_id', 'usuario_id'],
            name: 'unique_inscripcion'
        }
    ]
});
exports.default = Inscripcion;
//# sourceMappingURL=inscripcion.js.map