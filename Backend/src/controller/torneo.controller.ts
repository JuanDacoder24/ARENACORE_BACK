import type { Request, Response } from "express"
import Torneo from "../model/torneo"
import Inscripcion from "../model/inscripcion"

export const findAll = async (_req: Request, res: Response) => {
  try {
    const torneos = await Torneo.findAll()
    return res.status(200).json(torneos)
  } catch {
    return res.status(500).json({ message: "Error listando torneos" })
  }
}

export const findById = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id)
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" })
    return res.status(200).json(torneo)
  } catch {
    return res.status(500).json({ message: "Error obteniendo torneo" })
  }
}

export const post = async (req: Request, res: Response) => {
  try {
    const creado = await Torneo.create(req.body)
    return res.status(201).json(creado)
  } catch {
    return res.status(400).json({ message: "Error creando torneo" })
  }
}

export const put = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id)
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" })
    await torneo.update(req.body)
    return res.status(200).json(torneo)
  } catch {
    return res.status(400).json({ message: "Error actualizando torneo" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByPk(req.params.id)
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" })
    await torneo.destroy()
    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: "Error borrando torneo" })
  }
}

export const publicar = async (_req: Request, res: Response) => {
  return res.status(501).json({ message: "publicar torneo" })
}

export const cancelar = async (_req: Request, res: Response) => {
  return res.status(501).json({ message: "cancelar torneo" })
}

export const inscribir = async (req: Request, res: Response) => {
  try {
    const torneo_id = parseInt(req.params.id)
    const { usuario_id } = req.body

    const torneo = await Torneo.findByPk(torneo_id)
    if (!torneo) return res.status(404).json({ message: "Torneo no encontrado" })

    if (torneo.estado !== 'abierto') {
      return res.status(400).json({ message: "El torneo no está abierto para inscripciones" })
    }

    const participantes = torneo.participantes_actuales ?? 0

    if (participantes >= torneo.max_participantes) {
      return res.status(400).json({ message: "El torneo está lleno" })
    }

    await Inscripcion.create({ torneo_id, usuario_id })

    await torneo.update({ participantes_actuales: participantes + 1 })

    return res.status(201).json({ message: "Inscripción exitosa" })

  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Ya estás inscrito en este torneo" })
    }
    return res.status(500).json({ message: "Error al inscribirse" })
  }
}