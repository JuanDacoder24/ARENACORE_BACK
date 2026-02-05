import type { Request, Response } from "express";
import Torneo from "../model/torneo";

export const findAll = async (_req: Request, res: Response) => {
  try {
    const torneos = await Torneo.findAll();
    return res.status(200).json(torneos);
  } catch {
    return res.status(500).json({ message: "Error listando torneos" });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id);
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" });
    return res.status(200).json(torneo);
  } catch {
    return res.status(500).json({ message: "Error obteniendo torneo" });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const creado = await Torneo.create(req.body);
    return res.status(201).json(creado);
  } catch {
    return res.status(400).json({ message: "Error creando torneo" });
  }
};

export const put = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id);
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" });
    await torneo.update(req.body);
    return res.status(200).json(torneo);
  } catch {
    return res.status(400).json({ message: "Error actualizando torneo" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id);
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" });
    await torneo.destroy();
    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: "Error borrando torneo" });
  }
};

// Acciones de negocio estado
export const publicar = async (req: Request, res: Response) => {
  // validar que esté en borrador y que tenga fechas ok
  return res.status(501).json({ message: "publicar torneo" });
};

export const cancelar = async (req: Request, res: Response) => {
  // reglas: solo admin/creador; devolver inscritos; cerrar partidas
  return res.status(501).json({ message: "cancelar torneo" });
};
