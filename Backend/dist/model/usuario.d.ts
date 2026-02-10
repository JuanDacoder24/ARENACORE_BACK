import { Model, Optional } from 'sequelize';
interface UsuarioAttributes {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    nombre?: string;
    apellido?: string;
    avatar_url?: string;
    pais?: string;
    fecha_registro?: Date;
    activo?: boolean;
}
interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'nombre' | 'apellido' | 'avatar_url' | 'pais' | 'fecha_registro' | 'activo'> {
}
declare class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    nombre?: string;
    apellido?: string;
    avatar_url?: string;
    pais?: string;
    fecha_registro?: Date;
    activo?: boolean;
    verifyPassword(plainPassword: string): Promise<boolean>;
    toJSON(): {
        id: number;
        username: string;
        email: string;
        nombre?: string;
        apellido?: string;
        avatar_url?: string;
        pais?: string;
        fecha_registro?: Date;
        activo?: boolean;
    };
    static findByEmail(email: string): Promise<Usuario | null>;
    static findByUsername(username: string): Promise<Usuario | null>;
}
export default Usuario;
//# sourceMappingURL=usuario.d.ts.map