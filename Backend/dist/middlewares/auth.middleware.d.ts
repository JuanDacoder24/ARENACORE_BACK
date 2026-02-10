import { Request, Response, NextFunction } from 'express';
export interface AuthUser {
    id: number;
    username: string;
    email: string;
    nombre?: string;
    apellido?: string;
    pais?: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkOwnership: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map