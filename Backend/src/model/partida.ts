import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PartidaAttributes {
  id: number;
  torneo_id: number;
  ronda: number;
  jugador1_id?: number;
  jugador2_id?: number;
  ganador_id?: number;
  puntaje_j1?: number;
  puntaje_j2?: number;
  estado?: 'pendiente' | 'en_progreso' | 'finalizada';
  fecha_partida?: Date;
}

interface PartidaCreationAttributes extends Optional<PartidaAttributes, 'id' | 'jugador1_id' | 'jugador2_id' | 'ganador_id' | 'puntaje_j1' | 'puntaje_j2' | 'estado' | 'fecha_partida'> {}

class Partida extends Model<PartidaAttributes, PartidaCreationAttributes> implements PartidaAttributes {
  public id!: number;
  public torneo_id!: number;
  public ronda!: number;
  public jugador1_id?: number;
  public jugador2_id?: number;
  public ganador_id?: number;
  public puntaje_j1?: number;
  public puntaje_j2?: number;
  public estado?: 'pendiente' | 'en_progreso' | 'finalizada';
  public fecha_partida?: Date;
}

Partida.init(
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
    ronda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jugador1_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jugador2_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ganador_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puntaje_j1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puntaje_j2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_progreso', 'finalizada'),
      defaultValue: 'pendiente'
    },
    fecha_partida: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'partidas',
    timestamps: false
  }
);

export default Partida;