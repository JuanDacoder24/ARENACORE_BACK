import { Router } from 'express'
import * as InscripcionesController from '../controller/inscripciones.controller'

const router = Router()

// /api/torneos/:torneo_id/inscripciones
router.get(
  '/torneos/:torneo_id/inscripciones',
  InscripcionesController.listByTorneo
);

router.post(
  '/torneos/:torneo_id/inscripciones',
  InscripcionesController.join
);

router.delete(
  '/torneos/:torneo_id/inscripciones',
  InscripcionesController.leave
);

export default router
