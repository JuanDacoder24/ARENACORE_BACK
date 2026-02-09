import type { Request, Response } from "express"
import Usuario from "../model/usuario" 

export const findAll = async (_req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll()
    return res.status(200).json(usuarios)
  } catch (error) {
    return res.status(500).json({ message: "Error listando usuarios" })
  }
}

export const findById = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    return res.status(200).json(usuario)
  } catch {
    return res.status(500).json({ message: "Error obteniendo usuario" })
  }
}

export const post = async (req: Request, res: Response) => {
  try {
    const creado = await Usuario.create(req.body)
    return res.status(201).json(creado)
  } catch {
    return res.status(400).json({ message: "Error creando usuario" })
  }
}

export const put = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    await usuario.update(req.body)
    return res.status(200).json(usuario)
  } catch {
    return res.status(400).json({ message: "Error actualizando usuario" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" })
    await usuario.destroy()
    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: "Error borrando usuario" })
  }
}
