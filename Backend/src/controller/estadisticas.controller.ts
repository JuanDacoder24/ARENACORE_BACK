import type { Request, Response } from "express";
import EstadisticasJugador from "../model/estadisticas-jugador";

export const statsJugador = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    const stats = await EstadisticasJugador.findOne({
    where: { usuario_id: Number(userId) }  // 👈
    });

    if (!stats) {
      return res.status(404).json({ success: false, message: "Estadísticas no encontradas" });
    }

    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
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