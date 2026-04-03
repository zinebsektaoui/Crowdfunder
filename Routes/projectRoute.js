const express  = require("express")
const { create, drop, update, getAll } = require("../Controllers/projectController")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")
const validate = require("../Middlewares/validateMiddleware")
const projectSchema = require("../Validators/projectValidator")

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("Project Owner"), validate(projectSchema), create)
router.delete("/:id", authMiddleware, roleMiddleware("Project Owner"), drop)
router.put("/:id", authMiddleware, roleMiddleware("Project Owner"), validate(projectSchema), update)
router.get("/", authMiddleware, roleMiddleware("Project Owner"), getAll)

module.exports = router