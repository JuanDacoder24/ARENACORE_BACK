import { Model, Optional } from 'sequelize';
interface JuegoAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    categoria_id?: number;
    imagen_url?: string;
    desarrollador?: string;
    max_jugadores_equipo?: number;
    activo?: boolean;
    destacado?: boolean;
    created_at?: Date;
}
interface JuegoCreationAttributes extends Optional<JuegoAttributes, 'id' | 'descripcion' | 'categoria_id' | 'imagen_url' | 'desarrollador' | 'max_jugadores_equipo' | 'activo' | 'destacado' | 'created_at'> {
}
declare class Juego extends Model<JuegoAttributes, JuegoCreationAttributes> implements JuegoAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    categoria_id?: number;
    imagen_url?: string;
    desarrollador?: string;
    max_jugadores_equipo?: number;
    activo?: boolean;
    destacado?: boolean;
    created_at?: Date;
}
export default Juego;
//# sourceMappingURL=juego.d.ts.map