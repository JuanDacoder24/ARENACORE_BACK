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
export { Usuario, EstadisticasJugador, Billetera, Categoria, Juego, MonedaVirtual, Suscripcion, Torneo, Inscripcion, Partida, };
import sequelize from '../config/database';
export { sequelize };
export declare const syncDatabase: (force?: boolean) => Promise<void>;
export declare const testConnection: () => Promise<boolean>;
//# sourceMappingURL=index.d.ts.map