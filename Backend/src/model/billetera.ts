import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BilleteraAttributes {
  id: number;
  usuario_id: number;
  saldo?: number;
  updated_at?: Date;
}

interface BilleteraCreationAttributes extends Optional<BilleteraAttributes, 'id' | 'saldo' | 'updated_at'> {}

class Billetera extends Model<BilleteraAttributes, BilleteraCreationAttributes> implements BilleteraAttributes {
  public id!: number;
  public usuario_id!: number;
  public saldo?: number;
  public updated_at?: Date;
}

Billetera.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    saldo: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.00
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'billetera',
    timestamps: false
  }
);

export default Billetera;