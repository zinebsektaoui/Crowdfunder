const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "role" : {
        "type" : String,
        "default" : "projectOwner",
        "enum" : ["Admin", "Project Owner", "Investor"],
        "default" : "Project Owner"
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users