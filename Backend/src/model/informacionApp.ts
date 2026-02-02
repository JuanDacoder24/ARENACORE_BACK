import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InformacionAppAttributes {
  id: number;
  clave: string;
  titulo?: string;
  contenido?: string;
  updated_at?: Date;
}

interface InformacionAppCreationAttributes extends Optional<InformacionAppAttributes, 'id' | 'titulo' | 'contenido' | 'updated_at'> {}

class InformacionApp extends Model<InformacionAppAttributes, InformacionAppCreationAttributes> implements InformacionAppAttributes {
  public id!: number;
  public clave!: string;
  public titulo?: string;
  public contenido?: string;
  public updated_at?: Date;
}

InformacionApp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    clave: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'informacion_app',
    timestamps: false
  }
);

export default InformacionApp;