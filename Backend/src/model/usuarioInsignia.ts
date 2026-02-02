import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsuarioInsigniaAttributes {
  id: number;
  usuario_id: number;
  insignia_id: number;
  fecha_obtencion?: Date;
}

interface UsuarioInsigniaCreationAttributes extends Optional<UsuarioInsigniaAttributes, 'id' | 'fecha_obtencion'> {}

class UsuarioInsignia extends Model<UsuarioInsigniaAttributes, UsuarioInsigniaCreationAttributes> implements UsuarioInsigniaAttributes {
  public id!: number;
  public usuario_id!: number;
  public insignia_id!: number;
  public fecha_obtencion?: Date;
}

UsuarioInsignia.init(
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
    insignia_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_obtencion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'usuario_insignias',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['usuario_id', 'insignia_id'],
        name: 'unique_user_badge'
      }
    ]
  }
);

export default UsuarioInsignia;