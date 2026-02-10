import { Model, Optional } from 'sequelize';
interface TorneoAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    juego_id: number;
    organizador_id: number;
    tipo?: 'publico' | 'privado';
    estado?: 'abierto' | 'en_progreso' | 'finalizado' | 'cancelado';
    max_participantes: number;
    participantes_actuales?: number;
    precio_inscripcion?: number;
    premio_total?: number;
    fecha_inicio: Date;
    fecha_fin?: Date;
    reglas?: string;
    created_at?: Date;
}
interface TorneoCreationAttributes extends Optional<TorneoAttributes, 'id' | 'descripcion' | 'tipo' | 'estado' | 'participantes_actuales' | 'precio_inscripcion' | 'premio_total' | 'fecha_fin' | 'reglas' | 'created_at'> {
}
declare class Torneo extends Model<TorneoAttributes, TorneoCreationAttributes> implements TorneoAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    juego_id: number;
    organizador_id: number;
    tipo?: 'publico' | 'privado';
    estado?: 'abierto' | 'en_progreso' | 'finalizado' | 'cancelado';
    max_participantes: number;
    participantes_actuales?: number;
    precio_inscripcion?: number;
    premio_total?: number;
    fecha_inicio: Date;
    fecha_fin?: Date;
    reglas?: string;
    created_at?: Date;
}
export default Torneo;
//# sourceMappingURL=torneo.d.ts.map