import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TorneoAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  juego_id: number;
  organizador_id: number;
  tipo?: 'publico' | 'privado';
  estado?: 'abierto' | 'en_progreso' | 'finalizado' | 'cancelado';
  max_participantes: number;
  participantes_actuales?: number;
  precio_inscripcion?: number;
  premio_total?: number;
  fecha_inicio: Date;
  fecha_fin?: Date;
  reglas?: string;
  created_at?: Date;
}

interface TorneoCreationAttributes extends Optional<TorneoAttributes, 'id' | 'descripcion' | 'tipo' | 'estado' | 'participantes_actuales' | 'precio_inscripcion' | 'premio_total' | 'fecha_fin' | 'reglas' | 'created_at'> {}

class Torneo extends Model<TorneoAttributes, TorneoCreationAttributes> implements TorneoAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public juego_id!: number;
  public organizador_id!: number;
  public tipo?: 'publico' | 'privado';
  public estado?: 'abierto' | 'en_progreso' | 'finalizado' | 'cancelado';
  public max_participantes!: number;
  public participantes_actuales?: number;
  public precio_inscripcion?: number;
  public premio_total?: number;
  public fecha_inicio!: Date;
  public fecha_fin?: Date;
  public reglas?: string;
  public created_at?: Date;
}

Torneo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    juego_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('publico', 'privado'),
      defaultValue: 'publico'
    },
    estado: {
      type: DataTypes.ENUM('abierto', 'en_progreso', 'finalizado', 'cancelado'),
      defaultValue: 'abierto'
    },
    max_participantes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participantes_actuales: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    precio_inscripcion: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    premio_total: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reglas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'torneos',
    timestamps: false
  }
);

export default Torneo;