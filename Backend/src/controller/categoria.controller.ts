import type { Request, Response } from "express";
import Categoria from "../model/categoria";

export const findAll = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json(await Categoria.findAll());
  } catch {
    return res.status(500).json({ message: "Error listando categorías" });
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    return res.status(201).json(await Categoria.create(req.body));
  } catch {
    return res.status(400).json({ message: "Error creando categoría" });
  }
};
