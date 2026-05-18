import type { Request, Response } from "express";
import { EstadisticasJugador } from "../model";

export const statsJugador = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    let stats = await EstadisticasJugador.findOne({
      where: { usuario_id: Number(userId) } 
    });

    if (!stats) {
      stats = await EstadisticasJugador.create({
        usuario_id: Number(userId),
        torneos_jugados: 10,      
        torneos_ganados: 3,
        partidas_jugadas: 50,
        partidas_ganadas: 28,
        puntos_totales: 1500,
        nivel: 5,
        ranking_global: 2000,
      });
    }

    return res.status(200).json({ success: true, data: stats });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error al obtener estadísticas" });
  }
};

export const rankingTorneo = async (_req: Request, res: Response) => {
  try {
    const ranking = await EstadisticasJugador.findAll({
      order: [['puntos_totales', 'DESC']],
      limit: 10
    });

    return res.status(200).json({ success: true, data: ranking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al obtener ranking" });
  }
};