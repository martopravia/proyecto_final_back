const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { expressjwt: checkjwt } = require("express-jwt");
const { requireEntity } = require("../middlewares/requireEntity");
const { sanitizeData } = require("../middlewares/sanitizeData");
const { validateRequiredFields } = require("../middlewares/validateRequiredFields");
/*
 * API endpoints relacionados a las ordenes.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/orders",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.use(checkjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })); //TODO: ADMIN / USER
router.get("/", orderController.index);
router.post("/", orderController.store);
router.get("/:id", requireEntity(), orderController.show);
router.patch("/:id", sanitizeData, requireEntity(), orderController.update);
router.delete("/:id", requireEntity(), orderController.destroy);

module.exports = router;
