const { investInProject, getOpenProjects } = require("../Controllers/investmentController")
const express = require("express")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")
const validate = require("../Middlewares/validateMiddleware")
const investSchema = require("../Validators/investValidator")

const router = express.Router()

router.post("/:projectId", authMiddleware, roleMiddleware("Investor"), validate(investSchema), investInProject)
router.get("/", authMiddleware, roleMiddleware("Investor"), getOpenProjects)

module.exports = router