import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface FaqAttributes {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria?: string;
  orden?: number;
  activa?: boolean;
}

interface FaqCreationAttributes extends Optional<FaqAttributes, 'id' | 'categoria' | 'orden' | 'activa'> {}

class Faq extends Model<FaqAttributes, FaqCreationAttributes> implements FaqAttributes {
  public id!: number;
  public pregunta!: string;
  public respuesta!: string;
  public categoria?: string;
  public orden?: number;
  public activa?: boolean;
}

Faq.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pregunta: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'faqs',
    timestamps: false
  }
);

export default Faq;