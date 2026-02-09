import { Router } from "express";

import usuariosRoutes from "./usuario.routes";
import torneosRoutes from "./torneo.routes";
import inscripcionesRoutes from "./inscripciones.routes";
import partidasRoutes from "./partidas.routes";
import juegosRoutes from "./juego.routes";
import categoriasRoutes from "./categoria.routes";
import estadisticasRoutes from "./estadisticas.routes";

const router = Router();

router.use("/api", usuariosRoutes);
router.use("/api", torneosRoutes);
router.use("/api", inscripcionesRoutes);
router.use("/api", partidasRoutes);
router.use("/api", juegosRoutes);
router.use("/api", categoriasRoutes);
router.use("/api", estadisticasRoutes);

export default router;
