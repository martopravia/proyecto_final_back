require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(cors()); // Para habilitar esta línea es necesario instalar la librería `cors`.
app.use(express.static("public"));
app.use(express.json());

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
