const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: checkjwt } = require("express-jwt");
const { requireEntity } = require("../middlewares/requireEntity");
const { sanitizeData } = require("../middlewares/sanitizeData");
const { validateRequiredFields } = require("../middlewares/validateRequiredFields");
const formidableParse = require("../middlewares/formidableParse");
require("dotenv").config();

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", productController.index);
router.get("/:slug/:id", requireEntity(), productController.show);
router.get("/:id", requireEntity(), productController.show);
router.use(checkjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })); //TODO: Solo ADMIN
router.post("/", formidableParse, validateRequiredFields(), sanitizeData, productController.store);
router.patch("/:id", formidableParse, sanitizeData, requireEntity(), productController.update);
router.delete("/:id", requireEntity(), productController.destroy);

module.exports = router;
