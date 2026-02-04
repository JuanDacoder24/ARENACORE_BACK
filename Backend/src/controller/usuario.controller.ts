import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../model/usuario";


export const findAll = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ["password_hash"] }
        })
        res.status(200).json(usuarios);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export const findById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ["password_hash"] }
        })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        } 

        res.status(200).json(usuario);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export const post = async (req: Request, res: Response) => {
    try {
        const { 
            username, 
            email, 
            password, 
            nombre, 
            apellido, 
            pais } = req.body

        // Validar campos obligatorios
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Los campos username, email y password son obligatorios"
            })
        }

        // Verificar si el username o email ya existen
        const usuarioExistente = await Usuario.findOne({
            where: { username }
        })
        if (usuarioExistente) {
            return res.status(409).json({ message: "El username ya está en uso" })
        }

        const emailExistente = await Usuario.findOne({
            where: { email }
        })
        if (emailExistente) {
            return res.status(409).json({ message: "El email ya está en uso" })
        }

        // Hacer hash de la contraseña en el servidor
        const password_hash = await bcrypt.hash(password, 10)

        const usuario = await Usuario.create({
            username,
            email,
            password_hash,  //Se guarda el hash en texto plano
            nombre,
            apellido,
            pais
        })

        // Devolver sin el password_hash
        const { password_hash: _, ...usuarioSinPassword } = usuario.toJSON()
        res.status(201).json(usuarioSinPassword);

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: "Error desconocido" })
        }
    }
}

export const put = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const { 
            username, 
            email, 
            nombre, 
            apellido, 
            pais } = req.body

        await usuario.update({
            username,
            email,
            nombre,
            apellido,
            pais
        })

        // Devolver sin password_hash
        const { password_hash: _, ...usuarioSinPassword } = usuario.toJSON()
        res.status(200).json(usuarioSinPassword)

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: "Error desconocido" })
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        await usuario.destroy()

        res.status(204).send()
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: "Error desconocido" })
        }
    }
}