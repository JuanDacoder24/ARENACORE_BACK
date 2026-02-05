import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface InscripcionAttributes {
  id: number;
  torneo_id: number;
  usuario_id: number;
  estado?: 'pendiente' | 'confirmada' | 'cancelada';
  fecha_inscripcion?: Date;
}

interface InscripcionCreationAttributes extends Optional<InscripcionAttributes, 'id' | 'estado' | 'fecha_inscripcion'> {}

class Inscripcion extends Model<InscripcionAttributes, InscripcionCreationAttributes> implements InscripcionAttributes {
  public id!: number;
  public torneo_id!: number;
  public usuario_id!: number;
  public estado?: 'pendiente' | 'confirmada' | 'cancelada';
  public fecha_inscripcion?: Date;
}

Inscripcion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    torneo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      defaultValue: 'pendiente'
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'inscripciones',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['torneo_id', 'usuario_id'],
        name: 'unique_inscripcion'
      }
    ]
  }
);

export default Inscripcion;