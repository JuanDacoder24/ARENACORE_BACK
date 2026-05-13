import { Router } from 'express'
import * as TorneosController from '../controller/torneo.controller'

const router = Router()

router.get('/torneos', TorneosController.findAll)
router.get('/torneos/:id', TorneosController.findById)
router.post('/torneos', TorneosController.post)
router.put('/torneos/:id', TorneosController.put)
router.delete('/torneos/:id', TorneosController.remove)

router.post('/torneos/:id/publicar', TorneosController.publicar)
router.post('/torneos/:id/cancelar', TorneosController.cancelar)
router.post('/torneos/:id/inscribir', TorneosController.inscribir)

router.get('/torneos/:id/participantes', TorneosController.obtenerParticipantes)
router.post('/torneos/:id/finalizar', TorneosController.finalizarTorneo)

export default router
