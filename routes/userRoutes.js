const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkjwt } = require("express-jwt");
const { requireEntity } = require("../middlewares/requireEntity");
const { sanitizeData } = require("../middlewares/sanitizeData");
const { validateRequiredFields } = require("../middlewares/validateRequiredFields");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */
router.post("/", validateRequiredFields(), sanitizeData, userController.store);
router.use(checkjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })); //TODO: ADMIN/USER
router.get("/", userController.index);
router.get("/:id", requireEntity(), userController.show);
router.patch("/:id", sanitizeData, requireEntity(), userController.update);
router.delete("/:id", requireEntity(), userController.destroy);

module.exports = router;
