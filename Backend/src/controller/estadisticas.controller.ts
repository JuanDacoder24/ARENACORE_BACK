import type { Request, Response } from "express";

export const statsJugador = async (req: Request, res: Response) => {
  // devolver victorias/derrotas, winrate, torneos jugados, etc.
  return res.status(501).json({ message: "estadísticas jugador" });
};

export const rankingTorneo = async (req: Request, res: Response) => {
  //  ranking por puntos/Elo/avance de bracket
  return res.status(501).json({ message: "ranking torneo" });
};
