const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/reset-db", adminController.resetDatabase);

module.exports = router;
