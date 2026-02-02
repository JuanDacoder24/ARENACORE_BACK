import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SuscripcionAttributes {
  id: number;
  usuario_id: number;
  plan_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado?: 'activa' | 'cancelada' | 'expirada';
  created_at?: Date;
}

interface SuscripcionCreationAttributes extends Optional<SuscripcionAttributes, 'id' | 'estado' | 'created_at'> {}

class Suscripcion extends Model<SuscripcionAttributes, SuscripcionCreationAttributes> implements SuscripcionAttributes {
  public id!: number;
  public usuario_id!: number;
  public plan_id!: number;
  public fecha_inicio!: Date;
  public fecha_fin!: Date;
  public estado?: 'activa' | 'cancelada' | 'expirada';
  public created_at?: Date;
}

Suscripcion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('activa', 'cancelada', 'expirada'),
      defaultValue: 'activa'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'suscripciones',
    timestamps: false
  }
);

export default Suscripcion;