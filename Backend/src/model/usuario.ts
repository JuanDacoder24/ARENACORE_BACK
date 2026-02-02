import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

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

export default Usuario;