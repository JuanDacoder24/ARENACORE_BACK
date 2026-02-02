import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InsigniaAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  icono_url?: string;
  victorias_requeridas?: number;
  puntos_otorgados?: number;
  activa?: boolean;
}

interface InsigniaCreationAttributes extends Optional<InsigniaAttributes, 'id' | 'descripcion' | 'icono_url' | 'victorias_requeridas' | 'puntos_otorgados' | 'activa'> {}

class Insignia extends Model<InsigniaAttributes, InsigniaCreationAttributes> implements InsigniaAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public icono_url?: string;
  public victorias_requeridas?: number;
  public puntos_otorgados?: number;
  public activa?: boolean;
}

Insignia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icono_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    victorias_requeridas: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    puntos_otorgados: {
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
    tableName: 'insignias',
    timestamps: false
  }
);

export default Insignia;