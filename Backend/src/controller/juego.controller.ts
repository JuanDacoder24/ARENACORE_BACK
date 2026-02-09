import type { Request, Response } from "express"
import Juego from "../model/juego"

export const findAll = async (_req: Request, res: Response) => {
  try {
    return res.status(200).json(await Juego.findAll())
  } catch {
    return res.status(500).json({ message: "Error listando juegos" })
  }
}

export const post = async (req: Request, res: Response) => {
  try {
    return res.status(201).json(await Juego.create(req.body))
  } catch {
    return res.status(400).json({ message: "Error creando juego" })
  }
}
