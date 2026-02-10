import { Model, Optional } from 'sequelize';
interface EstadisticasJugadorAttributes {
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
interface EstadisticasJugadorCreationAttributes extends Optional<EstadisticasJugadorAttributes, 'id' | 'torneos_jugados' | 'torneos_ganados' | 'partidas_jugadas' | 'partidas_ganadas' | 'puntos_totales' | 'nivel' | 'ranking_global' | 'updated_at'> {
}
declare class EstadisticasJugador extends Model<EstadisticasJugadorAttributes, EstadisticasJugadorCreationAttributes> implements EstadisticasJugadorAttributes {
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
export default EstadisticasJugador;
//# sourceMappingURL=estadisticasJugador.d.ts.map