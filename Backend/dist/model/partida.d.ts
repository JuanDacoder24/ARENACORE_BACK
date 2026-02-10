import { Model, Optional } from 'sequelize';
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
interface PartidaCreationAttributes extends Optional<PartidaAttributes, 'id' | 'jugador1_id' | 'jugador2_id' | 'ganador_id' | 'puntaje_j1' | 'puntaje_j2' | 'estado' | 'fecha_partida'> {
}
declare class Partida extends Model<PartidaAttributes, PartidaCreationAttributes> implements PartidaAttributes {
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
export default Partida;
//# sourceMappingURL=partida.d.ts.map