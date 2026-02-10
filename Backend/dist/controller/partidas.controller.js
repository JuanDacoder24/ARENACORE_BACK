"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportResult = exports.generateBracket = exports.listByTorneo = void 0;
const partida_1 = __importDefault(require("../model/partida"));
const listByTorneo = async (req, res) => {
    try {
        const partidas = await partida_1.default.findAll({ where: { torneo_id: req.params.torneo_id } });
        return res.status(200).json(partidas);
    }
    catch {
        return res.status(500).json({ message: "Error listando partidas" });
    }
};
exports.listByTorneo = listByTorneo;
const generateBracket = async (_req, res) => {
    // comprobar que el torneo está cerrado a inscripciones,
    return res.status(501).json({ message: "generar bracket/emparejamientos" });
};
exports.generateBracket = generateBracket;
const reportResult = async (req, res) => {
    try {
        const { ganador_id, puntaje_j1, puntaje_j2 } = req.body;
        const partida = await partida_1.default.findByPk(req.params.partidaId);
        if (!partida)
            return res.status(404).json({ message: "Partida no encontrada" });
        // validar que ganadorId sea uno de los jugadores, y que la partida no esté cerrada
        await partida.update({ ganador_id, puntaje_j1, puntaje_j2, estado: "finalizada" });
        return res.status(200).json(partida);
    }
    catch {
        return res.status(400).json({ message: "No se pudo reportar el resultado" });
    }
};
exports.reportResult = reportResult;
//# sourceMappingURL=partidas.controller.js.map