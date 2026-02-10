"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Usuario extends sequelize_1.Model {
    // ============ MÉTODOS DE INSTANCIA ============
    // Verificar contraseña
    async verifyPassword(plainPassword) {
        return await bcrypt_1.default.compare(plainPassword, this.password_hash);
    }
    // Ocultar password al convertir a JSON
    toJSON() {
        const { password_hash, ...values } = this.get();
        return values;
    }
    // ============ MÉTODOS ESTÁTICOS ============
    // Buscar por email
    static async findByEmail(email) {
        return await Usuario.findOne({
            where: {
                email,
                activo: true
            }
        });
    }
    // Buscar por username
    static async findByUsername(username) {
        return await Usuario.findOne({
            where: {
                username,
                activo: true
            }
        });
    }
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    avatar_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    pais: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'usuarios',
    timestamps: false
});
// ============ HOOKS ============
// Hash automático antes de crear
Usuario.beforeCreate(async (usuario) => {
    if (usuario.password_hash) {
        usuario.password_hash = await bcrypt_1.default.hash(usuario.password_hash, 10);
    }
});
// Hash automático antes de actualizar
Usuario.beforeUpdate(async (usuario) => {
    if (usuario.changed('password_hash')) {
        usuario.password_hash = await bcrypt_1.default.hash(usuario.password_hash, 10);
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map