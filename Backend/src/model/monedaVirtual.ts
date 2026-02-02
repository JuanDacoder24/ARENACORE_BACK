import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MonedaVirtualAttributes {
  id: number;
  nombre: string;
  codigo: string;
  simbolo?: string;
  tasa_usd?: number;
  tasa_eur?: number;
  activa?: boolean;
}

interface MonedaVirtualCreationAttributes extends Optional<MonedaVirtualAttributes, 'id' | 'simbolo' | 'tasa_usd' | 'tasa_eur' | 'activa'> {}

class MonedaVirtual extends Model<MonedaVirtualAttributes, MonedaVirtualCreationAttributes> implements MonedaVirtualAttributes {
  public id!: number;
  public nombre!: string;
  public codigo!: string;
  public simbolo?: string;
  public tasa_usd?: number;
  public tasa_eur?: number;
  public activa?: boolean;
}

MonedaVirtual.init(
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
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    simbolo: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    tasa_usd: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 1.0000
    },
    tasa_eur: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0.9200
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'moneda_virtual',
    timestamps: false
  }
);

export default MonedaVirtual;