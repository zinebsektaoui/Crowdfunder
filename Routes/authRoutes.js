const express  = require("express")
const { signUp, signIn } = require("../Controllers/authController")
const validate = require("../Middlewares/validateMiddleware")
const userSchema = require("../Validators/userValidator")

const router = express.Router();

router.post("/signUp", validate(userSchema),signUp)
router.post("/signIn", signIn)

module.exports =router