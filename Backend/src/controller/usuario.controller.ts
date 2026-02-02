import { Request, Response } from "express";
import Usuario from "../model/usuario";


//todos los usuarios
exports.findAll = async (res: Response) => {
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).json(usuarios)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}

//usuario por id
exports.findById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)
        if (usuario) {
            res.status(200).json(usuario)
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
        }
    }
}