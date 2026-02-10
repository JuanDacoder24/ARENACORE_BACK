import { Model, Optional } from 'sequelize';
interface BilleteraAttributes {
    id: number;
    usuario_id: number;
    saldo?: number;
    updated_at?: Date;
}
interface BilleteraCreationAttributes extends Optional<BilleteraAttributes, 'id' | 'saldo' | 'updated_at'> {
}
declare class Billetera extends Model<BilleteraAttributes, BilleteraCreationAttributes> implements BilleteraAttributes {
    id: number;
    usuario_id: number;
    saldo?: number;
    updated_at?: Date;
}
export default Billetera;
//# sourceMappingURL=billetera.d.ts.map