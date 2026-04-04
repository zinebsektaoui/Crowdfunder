const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "balance" : Number,
    "role" : {
        "type" : String,
        "enum" : ["Admin", "Project Owner", "Investor"],
        "default" : "Project Owner"
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users