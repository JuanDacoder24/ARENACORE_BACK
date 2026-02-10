"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leave = exports.join = exports.listByTorneo = void 0;
const inscripcion_1 = __importDefault(require("../model/inscripcion"));
const listByTorneo = async (req, res) => {
    try {
        const torneo_id = Number(req.params.torneo_id);
        if (Number.isNaN(torneo_id)) {
            return res.status(400).json({ message: "torneo_id inválido" });
        }
        const inscripciones = await inscripcion_1.default.findAll({ where: { torneo_id } });
        return res.status(200).json(inscripciones);
    }
    catch {
        return res.status(500).json({ message: "Error listando inscripciones" });
    }
};
exports.listByTorneo = listByTorneo;
const join = async (req, res) => {
    try {
        const torneo_id = Number(req.params.torneo_id);
        const usuario_id = Number(req.body.usuario_id);
        if (Number.isNaN(torneo_id) || Number.isNaN(usuario_id)) {
            return res.status(400).json({ message: "torneo_id/usuario_id inválidos" });
        }
        const creada = await inscripcion_1.default.create({ torneo_id, usuario_id });
        return res.status(201).json(creada);
    }
    catch {
        return res.status(400).json({ message: "No se pudo inscribir" });
    }
};
exports.join = join;
const leave = async (req, res) => {
    try {
        const torneo_id = Number(req.params.torneo_id);
        const usuario_id = Number(req.body.usuario_id);
        if (Number.isNaN(torneo_id) || Number.isNaN(usuario_id)) {
            return res.status(400).json({ message: "torneo_id/usuario_id inválidos" });
        }
        const insc = await inscripcion_1.default.findOne({ where: { torneo_id, usuario_id } });
        if (!insc)
            return res.status(404).json({ message: "Inscripción no encontrada" });
        await insc.destroy();
        return res.status(204).send();
    }
    catch {
        return res.status(500).json({ message: "No se pudo cancelar la inscripción" });
    }
};
exports.leave = leave;
//# sourceMappingURL=inscripciones.controller.js.map