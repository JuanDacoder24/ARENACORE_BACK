import { Request, Response } from "express";
import Usuario from "../model/usuario";

//estos metodos se haran de manera "generica" para reutilizarlos mas adelante

//metodo getAll
export const findAll = async (req: Request, res: Response) => {
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

//metodo buscar por id
export const findById = async (req: Request, res: Response) => {
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

//metodo post
export const post = async (req: Request, res: Response) => {
    try {
        //parametros obligatorios
        const { username, email, password_hash, nombre, apellido, pais } = req.body;

        const usuario = await Usuario.create({
            username,
            email,
            password_hash,
            nombre,
            apellido,
            pais
        });

        res.status(201).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
}

//metodo update
export const put = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.is)

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        const { username, email, nombre, apellido, pais } = req.body
        await usuario.update({
            username,
            email,
            nombre,
            apellido,
            pais,
        })

        res.status(200).json(usuario)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
}

//metodo delete
export const remove = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        await usuario.destroy()

        res.status(200).json({ message: 'Usuario eliminado exitosamente' })
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
}