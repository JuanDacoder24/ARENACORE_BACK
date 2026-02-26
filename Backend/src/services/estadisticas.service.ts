import EstadisticasJugador from "../model/estadisticas-jugador";

export class EstadisticasService {

  static async getByUsuario(userId: string | number) {
    const stats = await EstadisticasJugador.findOne({
      where: { usuario_id: userId }
    });

    if (!stats) {
      return { error: true, status: 404, message: "Estadísticas no encontradas" };
    }

    return { error: false, status: 200, data: stats };
  }

  static async getRanking() {
    const ranking = await EstadisticasJugador.findAll({
      order: [['puntos_totales', 'DESC']],
      limit: 10
    });

    return { error: false, status: 200, data: ranking };
  }
}