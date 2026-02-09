import { Router } from 'express'
import * as EstadisticasController from '../controller/estadisticas.controller'

const router = Router()

router.get('/estadisticas/ranking', EstadisticasController.rankingTorneo)
router.get('/estadisticas/stats', EstadisticasController.statsJugador)

export default router
