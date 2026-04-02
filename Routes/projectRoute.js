const express  = require("express")
const { create, drop, update } = require("../Controllers/projectController")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("Project Owner"), create)
router.delete("/:id", authMiddleware, roleMiddleware("Project Owner"), drop)
router.put("/:id", authMiddleware, roleMiddleware("Project Owner"), update)

module.exports = router