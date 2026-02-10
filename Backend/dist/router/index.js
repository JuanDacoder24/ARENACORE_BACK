"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_routes_1 = __importDefault(require("./usuario.routes"));
const torneo_routes_1 = __importDefault(require("./torneo.routes"));
const inscripciones_routes_1 = __importDefault(require("./inscripciones.routes"));
const partidas_routes_1 = __importDefault(require("./partidas.routes"));
const juego_routes_1 = __importDefault(require("./juego.routes"));
const categoria_routes_1 = __importDefault(require("./categoria.routes"));
const estadisticas_routes_1 = __importDefault(require("./estadisticas.routes"));
const router = (0, express_1.Router)();
router.use("/api", usuario_routes_1.default);
router.use("/api", torneo_routes_1.default);
router.use("/api", inscripciones_routes_1.default);
router.use("/api", partidas_routes_1.default);
router.use("/api", juego_routes_1.default);
router.use("/api", categoria_routes_1.default);
router.use("/api", estadisticas_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map