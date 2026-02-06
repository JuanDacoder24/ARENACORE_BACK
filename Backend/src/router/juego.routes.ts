import { Router } from 'express'
import * as JuegoController from '../controller/juego.controller'


const router = Router()

router.get('/juegos', JuegoController.findAll)
router.post('/juegos', JuegoController.post)

export default router 