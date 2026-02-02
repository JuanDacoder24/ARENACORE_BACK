import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CategoriaAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  icono_url?: string;
  activa?: boolean;
}

interface CategoriaCreationAttributes extends Optional<CategoriaAttributes, 'id' | 'descripcion' | 'icono_url' | 'activa'> {}

class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> implements CategoriaAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public icono_url?: string;
  public activa?: boolean;
}

Categoria.init(
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
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'categorias',
    timestamps: false
  }
);

export default Categoria;