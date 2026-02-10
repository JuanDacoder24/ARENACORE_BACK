import { Router } from "express";
import * as CategoriaController from "../controller/categoria.controller";

const router = Router();

router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", CategoriaController.post);

export default router;
