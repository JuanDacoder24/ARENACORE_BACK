import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

interface UsuarioAttributes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  nombre?: string;
  apellido?: string;
  avatar_url?: string;
  pais?: string;
  fecha_registro?: Date;
  activo?: boolean;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'nombre' | 'apellido' | 'avatar_url' | 'pais' | 'fecha_registro' | 'activo'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public nombre?: string;
  public apellido?: string;
  public avatar_url?: string;
  public pais?: string;
  public fecha_registro?: Date;
  public activo?: boolean;

  // ============ MÉTODOS DE INSTANCIA ============
  
  // Verificar contraseña
  public async verifyPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password_hash);
  }

  // Ocultar password al convertir a JSON
  public toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }

  // ============ MÉTODOS ESTÁTICOS ============
  
  // Buscar por email
  public static async findByEmail(email: string): Promise<Usuario | null> {
    return await Usuario.findOne({ 
      where: { 
        email, 
        activo: true 
      } 
    });
  }

  // Buscar por username
  public static async findByUsername(username: string): Promise<Usuario | null> {
    return await Usuario.findOne({ 
      where: { 
        username, 
        activo: true 
      } 
    });
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false
  }
);

// ============ HOOKS ============

// Hash automático antes de crear
Usuario.beforeCreate(async (usuario: Usuario) => {
  if (usuario.password_hash) {
    usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
  }
});

// Hash automático antes de actualizar
Usuario.beforeUpdate(async (usuario: Usuario) => {
  if (usuario.changed('password_hash')) {
    usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
  }
});

export default Usuario;