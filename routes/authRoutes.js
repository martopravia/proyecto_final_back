const authRoutes = require("express").Router();
const authController = require("../controllers/authController");
require("dotenv").config();

authRoutes.post("/login", authController.login);
module.exports = authRoutes;
