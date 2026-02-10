import type { Request, Response } from "express";
export declare const findAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const post: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const put: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=usuario.controller.d.ts.map