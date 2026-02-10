import type { Request, Response } from "express";
export declare const findAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const post: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const put: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const publicar: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cancelar: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=torneo.controller.d.ts.map