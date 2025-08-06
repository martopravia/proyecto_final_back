const authRoutes = require("express").Router();
const authController = require("../controllers/authController");
require("dotenv").config();

authRoutes.post("/login", authController.login);
authRoutes.post("/forgot-password", authController.forgotPassword);
authRoutes.post("/reset-password", authController.resetPassword);
module.exports = authRoutes;
