const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
require("dotenv").config();

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", productController.index);
router.post("/", productController.store);
router.get("/:id", productController.show);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;
