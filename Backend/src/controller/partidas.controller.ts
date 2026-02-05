import type { Request, Response } from "express";
import Partida from "../model/partida";

export const listByTorneo = async (req: Request, res: Response) => {
  try {
    const partidas = await Partida.findAll({ where: { torneo_id: req.params.torneo_id } });
    return res.status(200).json(partidas);
  } catch {
    return res.status(500).json({ message: "Error listando partidas" });
  }
};

export const generateBracket = async (req: Request, res: Response) => {
  // comprobar que el torneo está cerrado a inscripciones,
  return res.status(501).json({ message: "generar bracket/emparejamientos" });
};

export const reportResult = async (req: Request, res: Response) => {
  try {
    const { ganador_id, puntaje_j1, puntaje_j2 } = req.body;
    const partida = await Partida.findByPk(req.params.partidaId);
    if (!partida) return res.status(404).json({ message: "Partida no encontrada" });

    // validar que ganadorId sea uno de los jugadores, y que la partida no esté cerrada
    await partida.update({ ganador_id, puntaje_j1, puntaje_j2, estado: "finalizada" });

    return res.status(200).json(partida);
  } catch {
    return res.status(400).json({ message: "No se pudo reportar el resultado" });
  }
};
