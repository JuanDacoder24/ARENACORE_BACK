"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingTorneo = exports.statsJugador = void 0;
const statsJugador = async (_req, res) => {
    // devolver victorias/derrotas, winrate, torneos jugados, etc.
    return res.status(501).json({ message: "estadísticas jugador" });
};
exports.statsJugador = statsJugador;
const rankingTorneo = async (_req, res) => {
    //  ranking por puntos/Elo/avance de bracket
    return res.status(501).json({ message: "ranking torneo" });
};
exports.rankingTorneo = rankingTorneo;
//# sourceMappingURL=estadisticas.controller.js.map