import { Router } from 'express'
import * as UsuariosController from '../controller/usuario.controller'

const router = Router()

router.get('/usuarios', UsuariosController.findAll)
router.get('/usuarios/:id', UsuariosController.findById)
router.post('/usuarios', UsuariosController.post)
router.put('/usuarios/:id', UsuariosController.put)
router.delete('/usuarios/:id', UsuariosController.remove)

export default router
