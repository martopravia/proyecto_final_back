/*
 * Este archivo se encarga de crear todas las tablas del sistema.
 *
 * En caso de que las tablas ya existían, se eliminan y se crean
 * nuevamente.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node createDatabaseTables.js
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run tables
 */

require("dotenv").config();
const db = require("./models");

async function createDatabaseTables() {
  try {
    await db.sequelize.authenticate();
    console.log("[Database] ¡Conexión exitosa a la base de datos!");

    await db.sequelize.sync({ force: true });
    console.log("[Database] ¡Las tablas fueron creadas!");
  } catch (error) {
    console.error("Error al conectar con la base de datos", error.message);
  } finally {
    process.exit();
  }
}

createDatabaseTables();
