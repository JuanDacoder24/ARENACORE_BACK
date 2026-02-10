import { Model, Optional } from 'sequelize';
interface SuscripcionAttributes {
    id: number;
    usuario_id: number;
    plan_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado?: 'activa' | 'cancelada' | 'expirada';
    created_at?: Date;
}
interface SuscripcionCreationAttributes extends Optional<SuscripcionAttributes, 'id' | 'estado' | 'created_at'> {
}
declare class Suscripcion extends Model<SuscripcionAttributes, SuscripcionCreationAttributes> implements SuscripcionAttributes {
    id: number;
    usuario_id: number;
    plan_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado?: 'activa' | 'cancelada' | 'expirada';
    created_at?: Date;
}
export default Suscripcion;
//# sourceMappingURL=suscripcion.d.ts.map