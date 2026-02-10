"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.findAll = void 0;
const juego_1 = __importDefault(require("../model/juego"));
const findAll = async (_req, res) => {
    try {
        return res.status(200).json(await juego_1.default.findAll());
    }
    catch {
        return res.status(500).json({ message: "Error listando juegos" });
    }
};
exports.findAll = findAll;
const post = async (req, res) => {
    try {
        return res.status(201).json(await juego_1.default.create(req.body));
    }
    catch {
        return res.status(400).json({ message: "Error creando juego" });
    }
};
exports.post = post;
//# sourceMappingURL=juego.controller.js.map