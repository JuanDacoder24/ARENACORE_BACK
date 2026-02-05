
import Usuario from './usuario';
import EstadisticasJugador from './estadisticasJugador';
import Categoria from './categoria';
import Juego from './juego';
import MonedaVirtual from './monedaVirtual';
import Billetera from './billetera';
import Suscripcion from './suscripcion';
import Torneo from './torneo';
import Inscripcion from './inscripcion';
import Partida from './partida';

// USUARIO

// Usuario <-> EstadisticasJugador 1:1
Usuario.hasOne(EstadisticasJugador, {
  foreignKey: 'usuario_id',
  as: 'estadisticas',
  onDelete: 'CASCADE'
});
EstadisticasJugador.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Usuario <-> Billetera 1:1
Usuario.hasOne(Billetera, {
  foreignKey: 'usuario_id',
  as: 'billetera',
  onDelete: 'CASCADE'
});
Billetera.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Usuario <-> Torneos como organizador 1:N
Usuario.hasMany(Torneo, {
  foreignKey: 'organizador_id',
  as: 'torneosOrganizados'
});
Torneo.belongsTo(Usuario, {
  foreignKey: 'organizador_id',
  as: 'organizador'
});

// Usuario <-> Suscripciones 1:N
Usuario.hasMany(Suscripcion, {
  foreignKey: 'usuario_id',
  as: 'suscripciones',
  onDelete: 'CASCADE'
});
Suscripcion.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Usuario <-> Torneos a través de Inscripciones N:M
Usuario.belongsToMany(Torneo, {
  through: Inscripcion,
  foreignKey: 'usuario_id',
  otherKey: 'torneo_id',
  as: 'torneosInscritos'
});
Torneo.belongsToMany(Usuario, {
  through: Inscripcion,
  foreignKey: 'torneo_id',
  otherKey: 'usuario_id',
  as: 'participantes'
});

// Usuario <-> Inscripciones 1:N 
Usuario.hasMany(Inscripcion, {
  foreignKey: 'usuario_id',
  as: 'inscripciones',
  onDelete: 'CASCADE'
});
Inscripcion.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Usuario <-> Partidas como jugador 1, jugador 2 o ganador
Usuario.hasMany(Partida, {
  foreignKey: 'jugador1_id',
  as: 'partidasComoJugador1'
});
Usuario.hasMany(Partida, {
  foreignKey: 'jugador2_id',
  as: 'partidasComoJugador2'
});
Usuario.hasMany(Partida, {
  foreignKey: 'ganador_id',
  as: 'partidasGanadas'
});

Partida.belongsTo(Usuario, {
  foreignKey: 'jugador1_id',
  as: 'jugador1'
});
Partida.belongsTo(Usuario, {
  foreignKey: 'jugador2_id',
  as: 'jugador2'
});
Partida.belongsTo(Usuario, {
  foreignKey: 'ganador_id',
  as: 'ganador'
});

// CATEGORÍAS Y JUEGOS

// Categoria <-> Juegos 1:N
Categoria.hasMany(Juego, {
  foreignKey: 'categoria_id',
  as: 'juegos'
});
Juego.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria'
});

// Juego <-> Torneos 1:N
Juego.hasMany(Torneo, {
  foreignKey: 'juego_id',
  as: 'torneos'
});
Torneo.belongsTo(Juego, {
  foreignKey: 'juego_id',
  as: 'juego'
});

// TORNEOS

// Torneo <-> Inscripciones 1:N - Relación directa adicional
Torneo.hasMany(Inscripcion, {
  foreignKey: 'torneo_id',
  as: 'inscripciones',
  onDelete: 'CASCADE'
});
Inscripcion.belongsTo(Torneo, {
  foreignKey: 'torneo_id',
  as: 'torneo'
});

// Torneo <-> Partidas 1:N
Torneo.hasMany(Partida, {
  foreignKey: 'torneo_id',
  as: 'partidas',
  onDelete: 'CASCADE'
});
Partida.belongsTo(Torneo, {
  foreignKey: 'torneo_id',
  as: 'torneo'
});

// EXPORTAR TODOS LOS MODELOS

export {
  Usuario,
  EstadisticasJugador,
  Billetera,
  Categoria,
  Juego,
  MonedaVirtual,
  Suscripcion,
  Torneo,
  Inscripcion,
  Partida,
};

// EXPORTAR BASE DE DATOS

import sequelize from '../config/database';

export { sequelize };

// FUNCIÓN PARA SINCRONIZAR LA BASE DE DATOS

export const syncDatabase = async (force: boolean = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    throw error;
  }
};

// FUNCIÓN PARA PROBAR LA CONEXIÓN

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
    return true;
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    return false;
  }
};