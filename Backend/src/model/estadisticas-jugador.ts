import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EstadisticasAttributes {
  id: number;
  usuario_id: number;
  torneos_jugados?: number;
  torneos_ganados?: number;
  partidas_jugadas?: number;
  partidas_ganadas?: number;
  puntos_totales?: number;
  nivel?: number;
  ranking_global?: number;
  updated_at?: Date;
}

interface EstadisticasCreationAttributes extends Optional<EstadisticasAttributes, 'id' | 'torneos_jugados' | 'torneos_ganados' | 'partidas_jugadas' | 'partidas_ganadas' | 'puntos_totales' | 'nivel' | 'ranking_global' | 'updated_at'> {}

class EstadisticasJugador extends Model<EstadisticasAttributes, EstadisticasCreationAttributes> implements EstadisticasAttributes {
  public id!: number;
  public usuario_id!: number;
  public torneos_jugados?: number;
  public torneos_ganados?: number;
  public partidas_jugadas?: number;
  public partidas_ganadas?: number;
  public puntos_totales?: number;
  public nivel?: number;
  public ranking_global?: number;
  public updated_at?: Date;
}

EstadisticasJugador.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    torneos_jugados: { type: DataTypes.INTEGER, defaultValue: 0 },
    torneos_ganados: { type: DataTypes.INTEGER, defaultValue: 0 },
    partidas_jugadas: { type: DataTypes.INTEGER, defaultValue: 0 },
    partidas_ganadas: { type: DataTypes.INTEGER, defaultValue: 0 },
    puntos_totales: { type: DataTypes.INTEGER, defaultValue: 0 },
    nivel: { type: DataTypes.INTEGER, defaultValue: 1 },
    ranking_global: { type: DataTypes.INTEGER, allowNull: true },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'estadisticas_jugador',
    timestamps: false
  }
);

export default EstadisticasJugador;