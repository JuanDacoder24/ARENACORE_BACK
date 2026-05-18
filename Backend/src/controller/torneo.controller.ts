import type { Request, Response } from "express"
import Torneo from "../model/torneo"
import Inscripcion from "../model/inscripcion"
import { Billetera, sequelize, Usuario } from "../model"

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
  } catch (error: any) { 
    console.error("DETALLE DEL ERROR:", error); 
    return res.status(400).json({ 
      message: "Error creando torneo", 
      details: error.message 
    })
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

    if (!['abierto', 'en_progreso'].includes(torneo.estado?.toString() || '')) {
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

  export const obtenerParticipantes = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inscripciones = await Inscripcion.findAll({
            where: { torneo_id: id },
            include: [{ model: Usuario }]
        });
        
        const participantes = inscripciones.map((ins: any) => ins.Usuario);
        return res.status(200).json(participantes);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener participantes" });
    }
}

export const finalizarTorneo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ganador_id } = req.body;

    const t = await sequelize.transaction();

    try {
        const torneo: any = await Torneo.findByPk(id, { transaction: t });

        if (!torneo || torneo.estado !== 'abierto') {
            await t.rollback();
            return res.status(400).json({ message: 'Torneo no válido para finalizar' });
        }

        await torneo.update({
            estado: 'finalizado',
            ganador_id: ganador_id
        }, { transaction: t });

        const billetera: any = await Billetera.findOne({ 
            where: { usuario_id: ganador_id },
            transaction: t 
        });

        if (billetera) {
            const nuevoSaldo = Number(billetera.saldo) + Number(torneo.premio_total);
            await billetera.update({ saldo: nuevoSaldo }, { transaction: t });
        }

        await t.commit();
        return res.status(200).json({ message: 'Torneo finalizado y premio pagado con éxito' });

    } catch (error) {
        await t.rollback();
        console.error('Error en la transacción:', error);
        return res.status(500).json({ message: 'Error interno al procesar el cierre' });
    }
}