const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "role" : {
        "default" : "projectOwner",
        "enum" : ["admin", "projectOwner", "investor"]
    }
})

const users = mongoose.model("users", userSchema)
export default users