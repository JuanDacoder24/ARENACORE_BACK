import { Router } from 'express'
import * as PartidasController from '../controller/partidas.controller'

const router = Router()

// Listar partidas de un torneo
router.get('/torneos/:torneo_id/partidas', PartidasController.listByTorneo)

// Generar bracket/emparejamientos 
router.post('/torneos/:torneo_id/partidas/generar', PartidasController.generateBracket)

// Reportar resultado de una partida concreta
router.patch('/partidas/:partida_id/resultado', PartidasController.reportResult)

export default router
