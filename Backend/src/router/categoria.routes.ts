import { Router } from "express";
import * as EstadisticasController from "../controller/estadisticas.controller";

const router = Router();

router.get("/estadisticas/jugadores/:usuario_id", EstadisticasController.statsJugador);
router.get("/estadisticas/torneos/:torneo_id/ranking", EstadisticasController.rankingTorneo);

export default router;
