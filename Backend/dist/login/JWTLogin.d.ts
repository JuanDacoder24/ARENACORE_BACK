import Usuario from '../model/usuario';
interface JWTPayload {
    exp: number;
    id: number;
    username: string;
    nombre?: string;
    iat?: number;
}
export declare const createToken: (user: Usuario, rememberMe?: boolean) => string;
export declare const verifyToken: (token: string) => JWTPayload;
declare const _default: {
    createToken: (user: Usuario, rememberMe?: boolean) => string;
    verifyToken: (token: string) => JWTPayload;
};
export default _default;
//# sourceMappingURL=JWTLogin.d.ts.map