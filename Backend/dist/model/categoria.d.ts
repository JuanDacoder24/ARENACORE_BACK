import { Model, Optional } from 'sequelize';
interface CategoriaAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    icono_url?: string;
    activa?: boolean;
}
interface CategoriaCreationAttributes extends Optional<CategoriaAttributes, 'id' | 'descripcion' | 'icono_url' | 'activa'> {
}
declare class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> implements CategoriaAttributes {
    id: number;
    nombre: string;
    descripcion?: string;
    icono_url?: string;
    activa?: boolean;
}
export default Categoria;
//# sourceMappingURL=categoria.d.ts.map