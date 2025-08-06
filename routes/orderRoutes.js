const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const { expressjwt: checkjwt } = require("express-jwt");
/*
 * API endpoints relacionados a las ordenes.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/orders",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", orderController.index);
router.use(checkjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.post("/", orderController.store);
router.get("/:id", orderController.show);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = router;
