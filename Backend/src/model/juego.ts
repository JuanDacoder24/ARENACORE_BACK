import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface JuegoAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria_id?: number;
  imagen_url?: string;
  desarrollador?: string;
  max_jugadores_equipo?: number;
  activo?: boolean;
  destacado?: boolean;
  created_at?: Date;
}

interface JuegoCreationAttributes extends Optional<JuegoAttributes, 'id' | 'descripcion' | 'categoria_id' | 'imagen_url' | 'desarrollador' | 'max_jugadores_equipo' | 'activo' | 'destacado' | 'created_at'> {}

class Juego extends Model<JuegoAttributes, JuegoCreationAttributes> implements JuegoAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public categoria_id?: number;
  public imagen_url?: string;
  public desarrollador?: string;
  public max_jugadores_equipo?: number;
  public activo?: boolean;
  public destacado?: boolean;
  public created_at?: Date;
}

Juego.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    desarrollador: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    max_jugadores_equipo: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    destacado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'juegos',
    timestamps: false
  }
);

export default Juego;