import { Model, Optional } from 'sequelize';
interface MonedaVirtualAttributes {
    id: number;
    nombre: string;
    codigo: string;
    simbolo?: string;
    tasa_usd?: number;
    tasa_eur?: number;
    activa?: boolean;
}
interface MonedaVirtualCreationAttributes extends Optional<MonedaVirtualAttributes, 'id' | 'simbolo' | 'tasa_usd' | 'tasa_eur' | 'activa'> {
}
declare class MonedaVirtual extends Model<MonedaVirtualAttributes, MonedaVirtualCreationAttributes> implements MonedaVirtualAttributes {
    id: number;
    nombre: string;
    codigo: string;
    simbolo?: string;
    tasa_usd?: number;
    tasa_eur?: number;
    activa?: boolean;
}
export default MonedaVirtual;
//# sourceMappingURL=monedaVirtual.d.ts.map