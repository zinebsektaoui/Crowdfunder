const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "role" : {
        "type" : String,
        "default" : "projectOwner",
        "enum" : ["admin", "projectOwner", "investor"]
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users