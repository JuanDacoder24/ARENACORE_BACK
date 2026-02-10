"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelar = exports.publicar = exports.remove = exports.put = exports.post = exports.findById = exports.findAll = void 0;
const torneo_1 = __importDefault(require("../model/torneo"));
const findAll = async (_req, res) => {
    try {
        const torneos = await torneo_1.default.findAll();
        return res.status(200).json(torneos);
    }
    catch {
        return res.status(500).json({ message: "Error listando torneos" });
    }
};
exports.findAll = findAll;
const findById = async (req, res) => {
    try {
        const torneo = await torneo_1.default.findByPk(req.params.id);
        if (!torneo)
            return res.status(404).json({ message: "Torneo no encontrado" });
        return res.status(200).json(torneo);
    }
    catch {
        return res.status(500).json({ message: "Error obteniendo torneo" });
    }
};
exports.findById = findById;
const post = async (req, res) => {
    try {
        const creado = await torneo_1.default.create(req.body);
        return res.status(201).json(creado);
    }
    catch {
        return res.status(400).json({ message: "Error creando torneo" });
    }
};
exports.post = post;
const put = async (req, res) => {
    try {
        const torneo = await torneo_1.default.findByPk(req.params.id);
        if (!torneo)
            return res.status(404).json({ message: "Torneo no encontrado" });
        await torneo.update(req.body);
        return res.status(200).json(torneo);
    }
    catch {
        return res.status(400).json({ message: "Error actualizando torneo" });
    }
};
exports.put = put;
const remove = async (req, res) => {
    try {
        const torneo = await torneo_1.default.findByPk(req.params.id);
        if (!torneo)
            return res.status(404).json({ message: "Torneo no encontrado" });
        await torneo.destroy();
        return res.status(204).send();
    }
    catch {
        return res.status(500).json({ message: "Error borrando torneo" });
    }
};
exports.remove = remove;
// Acciones de negocio estado
const publicar = async (_req, res) => {
    // validar que esté en borrador y que tenga fechas ok
    return res.status(501).json({ message: "publicar torneo" });
};
exports.publicar = publicar;
const cancelar = async (_req, res) => {
    // reglas: solo admin/creador devolver inscritos cerrar partidas
    return res.status(501).json({ message: "cancelar torneo" });
};
exports.cancelar = cancelar;
//# sourceMappingURL=torneo.controller.js.map