const express  = require("express")
const { signUp } = require("../Controllers/user")

const router = express.Router();

router.post("/signUp", signUp)

module.exports =router