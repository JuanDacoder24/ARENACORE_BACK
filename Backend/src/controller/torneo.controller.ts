import { Request, Response } from "express";
import Torneo from "../model/torneo";
import Juego from "../model/juego";
import Usuario from "../model/usuario";

export const findAll = async (req: Request, res: Response) => {
    try {
        const torneos = await Torneo.findAll();
        res.status(200).json(torneos);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export const findById = async (req: Request, res: Response) => {
    try {
        const torneo = await Torneo.findByPk(req.params.id);

        if (!torneo) {
            return res.status(404).json({ message: "Torneo no encontrado" });
        }

        res.status(200).json(torneo);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export const post = async (req: Request, res: Response) => {
    try {
        const { 
            nombre, 
            descripcion,
            juego_id, 
            organizador_id, 
            tipo,
            max_participantes, 
            precio_inscripcion,
            premio_total,
            fecha_inicio,
            reglas
        } = req.body;

        // Validar campos obligatorios
        if (!nombre || !juego_id || !organizador_id || !max_participantes || !fecha_inicio) {
            return res.status(400).json({
                message: 'Los campos nombre, juego_id, organizador_id, max_participantes y fecha_inicio son obligatorios'
            });
        }

        // Verificar que el juego existe
        const juego = await Juego.findByPk(juego_id);
        if (!juego) {
            return res.status(404).json({ message: "El juego especificado no existe" });
        }

        // Verificar que el organizador existe
        const organizador = await Usuario.findByPk(organizador_id);
        if (!organizador) {
            return res.status(404).json({ message: "El organizador especificado no existe" });
        }

        // Verificar nombre duplicado (opcional)
        const torneoExistente = await Torneo.findOne({
            where: { nombre }
        });
        if (torneoExistente) {
            return res.status(409).json({ message: "Ya existe un torneo con ese nombre" });
        }

        // Crear el torneo
        const torneo = await Torneo.create({
            nombre,
            descripcion,
            juego_id,
            organizador_id,
            tipo: tipo || 'publico',
            max_participantes,
            precio_inscripcion: precio_inscripcion || 0,
            premio_total: premio_total || 0,
            fecha_inicio,
            reglas
        });

        res.status(201).json(torneo);

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
};

export const put = async (req: Request, res: Response) => {
    try {
        const torneo = await Torneo.findByPk(req.params.id);

        if (!torneo) {
            return res.status(404).json({ message: "Torneo no encontrado" });
        }

        const {
            nombre,
            descripcion,
            tipo,
            estado,
            max_participantes,
            precio_inscripcion,
            premio_total,
            fecha_inicio,
            fecha_fin,
            reglas
        } = req.body;

        // Validar que no se modifiquen campos críticos si el torneo ya está en progreso
        if (torneo.estado === 'en_progreso' || torneo.estado === 'finalizado') {
            await torneo.update({
                descripcion,
                reglas,
                premio_total
            });
        } else {
            await torneo.update({
                nombre,
                descripcion,
                tipo,
                estado,
                max_participantes,
                precio_inscripcion,
                premio_total,
                fecha_inicio,
                fecha_fin,
                reglas
            });
        }

        res.status(200).json(torneo);

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const torneo = await Torneo.findByPk(req.params.id);

        if (!torneo) {
            return res.status(404).json({ message: "Torneo no encontrado" });
        }

        // No permitir eliminar torneos en progreso o finalizados
        if (torneo.estado === 'en_progreso' || torneo.estado === 'finalizado') {
            return res.status(403).json({ 
                message: "No se puede eliminar un torneo en progreso o finalizado" 
            });
        }

        // Si tiene participantes, mejor cancelar
        if (torneo.participantes_actuales && torneo.participantes_actuales > 0) {
            return res.status(403).json({
                message: "El torneo tiene participantes inscritos. Considere cancelarlo"
            });
        }

        await torneo.destroy();
        res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
};