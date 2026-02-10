import { Model, Optional } from 'sequelize';
interface InscripcionAttributes {
    id: number;
    torneo_id: number;
    usuario_id: number;
    estado?: 'pendiente' | 'confirmada' | 'cancelada';
    fecha_inscripcion?: Date;
}
interface InscripcionCreationAttributes extends Optional<InscripcionAttributes, 'id' | 'estado' | 'fecha_inscripcion'> {
}
declare class Inscripcion extends Model<InscripcionAttributes, InscripcionCreationAttributes> implements InscripcionAttributes {
    id: number;
    torneo_id: number;
    usuario_id: number;
    estado?: 'pendiente' | 'confirmada' | 'cancelada';
    fecha_inscripcion?: Date;
}
export default Inscripcion;
//# sourceMappingURL=inscripcion.d.ts.map