import { Router } from 'express'
import * as EstadisticasController from '../controller/estadisticas.controller'

const router = Router()

router.get('/ranking', EstadisticasController.rankingTorneo)
router.get('/stats', EstadisticasController.statsJugador)

export default router
