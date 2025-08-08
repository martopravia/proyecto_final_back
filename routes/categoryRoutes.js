const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: checkjwt } = require("express-jwt");
const { requireEntity } = require("../middlewares/requireEntity");
const { sanitizeData } = require("../middlewares/sanitizeData");
const { validateRequiredFields } = require("../middlewares/validateRequiredFields");

/*
 * API endpoints relacionados a las categorías.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/categories",
 * tal como se definió en el archivo `routes/index.js`.
 */
router.use(checkjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })); //TODO: ADMIN/USER
router.get("/", categoryController.index);
router.get("/:id", requireEntity(), categoryController.show);
router.post("/", validateRequiredFields(), sanitizeData, categoryController.store);
router.patch("/:id", sanitizeData, requireEntity(), categoryController.update);
router.delete("/:id", requireEntity(), categoryController.destroy);

module.exports = router;
