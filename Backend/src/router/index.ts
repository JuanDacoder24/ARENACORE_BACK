import { Router } from "express";

import usuariosRoutes from "./usuario.routes";
import torneosRoutes from "./torneo.routes";
import inscripcionesRoutes from "./inscripciones.routes";
import partidasRoutes from "./partidas.routes";
import juegosRoutes from "./juego.routes";
import categoriasRoutes from "./categoria.routes";
import estadisticasRoutes from "./estadisticas.routes";

const router = Router();

router.use('/', usuariosRoutes);
router.use('/', torneosRoutes);
router.use('/', inscripcionesRoutes);
router.use('/', partidasRoutes);
router.use('/', juegosRoutes);
router.use('/', categoriasRoutes);
router.use('/estadisticas', estadisticasRoutes);

export default router;
