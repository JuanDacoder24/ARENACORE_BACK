import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PlanSuscripcionAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_mensual: number;
  duracion_dias: number;
  acceso_torneos_privados?: boolean;
  activo?: boolean;
}

interface PlanSuscripcionCreationAttributes extends Optional<PlanSuscripcionAttributes, 'id' | 'descripcion' | 'acceso_torneos_privados' | 'activo'> {}

class PlanSuscripcion extends Model<PlanSuscripcionAttributes, PlanSuscripcionCreationAttributes> implements PlanSuscripcionAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public precio_mensual!: number;
  public duracion_dias!: number;
  public acceso_torneos_privados?: boolean;
  public activo?: boolean;
}

PlanSuscripcion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio_mensual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    duracion_dias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    acceso_torneos_privados: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'planes_suscripcion',
    timestamps: false
  }
);

export default PlanSuscripcion;