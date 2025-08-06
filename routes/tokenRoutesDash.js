const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
require("dotenv").config();

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.post("/login", authController.login);

module.exports = router;
