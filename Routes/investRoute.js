const { investInProject, getOpenProjects, getInvestmentsDetails, getProjectDetails } = require("../Controllers/investmentController")
const express = require("express")
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")
const validate = require("../Middlewares/validateMiddleware")
const investSchema = require("../Validators/investValidator")

const router = express.Router()

router.post("/:projectId", authMiddleware, roleMiddleware("Investor"), validate(investSchema), investInProject)
router.get("/", authMiddleware, roleMiddleware("Investor"), getOpenProjects)
router.get("/getProjects/:projectId", authMiddleware, roleMiddleware("Investor"), getProjectDetails)
router.get("/getInvestments", authMiddleware, roleMiddleware("Investor"), getInvestmentsDetails)

module.exports = router