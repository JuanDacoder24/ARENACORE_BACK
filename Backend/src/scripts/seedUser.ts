import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import path from 'path';

// Cargar .env de la carpeta superior si está ahí (Backend/..)
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
// Opcional: cargar local si existe
dotenv.config();

import sequelize from "../config/database";
import Usuario from "../model/usuario";

const seedUser = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");

    // Asegurarse de que las tablas existan
    await sequelize.sync();

    const email = "jugador@arenacore.com";
    const password = "Arena2026!";
    const username = "JugadorPrueba";
    const nombre = "Jugador ArenaCore";

    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { email } });

    if (existingUser) {
      console.log(
        `El usuario con email ${email} ya existe en la base de datos.`,
      );
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Usuario.create({
      username,
      nombre,
      email,
      password_hash: hashedPassword,
    });

    console.log(
      `Usuario de prueba creado con éxito:\nEmail: ${email}\nContraseña: ${password}`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error al crear el usuario de prueba:", error);
    process.exit(1);
  }
};

seedUser();
