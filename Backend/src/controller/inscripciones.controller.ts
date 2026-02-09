import type { Request, Response } from "express"
import Inscripcion from "../model/inscripcion"

export const listByTorneo = async (req: Request, res: Response) => {
  try {
    const torneo_id = Number(req.params.torneo_id)
    if (Number.isNaN(torneo_id)) {
      return res.status(400).json({ message: "torneo_id inválido" })
    }

    const inscripciones = await Inscripcion.findAll({ where: { torneo_id } })
    return res.status(200).json(inscripciones)
  } catch {
    return res.status(500).json({ message: "Error listando inscripciones" })
  }
}

export const join = async (req: Request, res: Response) => {
  try {
    const torneo_id = Number(req.params.torneo_id)
    const usuario_id = Number(req.body.usuario_id)

    if (Number.isNaN(torneo_id) || Number.isNaN(usuario_id)) {
      return res.status(400).json({ message: "torneo_id/usuario_id inválidos" })
    }

    const creada = await Inscripcion.create({ torneo_id, usuario_id })
    return res.status(201).json(creada)
  } catch {
    return res.status(400).json({ message: "No se pudo inscribir" })
  }
}

export const leave = async (req: Request, res: Response) => {
  try {
    const torneo_id = Number(req.params.torneo_id)
    const usuario_id = Number(req.body.usuario_id)

    if (Number.isNaN(torneo_id) || Number.isNaN(usuario_id)) {
      return res.status(400).json({ message: "torneo_id/usuario_id inválidos" })
    }

    const insc = await Inscripcion.findOne({ where: { torneo_id, usuario_id } })
    if (!insc) return res.status(404).json({ message: "Inscripción no encontrada" })

    await insc.destroy()
    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: "No se pudo cancelar la inscripción" })
  }
}
