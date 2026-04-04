const express = require("express");
const { getInvestors, getProjectOwners, getProjectOwnerWallet } = require("../Controllers/adminController");
const { authMiddleware } = require("../Middlewares/authMiddleware")
const { roleMiddleware } = require("../Middlewares/roleMiddleware")


const router = express.Router();

router.get("/investors", authMiddleware, roleMiddleware("Admin"), getInvestors)
router.get("/ProjectOwners", authMiddleware, roleMiddleware("Admin"), getProjectOwners)
router.get("/getProjectOwnerWallet/:id", authMiddleware, roleMiddleware("Admin"), getProjectOwnerWallet)

module.exports = router