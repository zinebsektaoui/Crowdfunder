const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    "title" : String,
    "description" : String,
    "capital" : Number,
    "status" : {
        type : String,
        enum : ["open", "closed"],
        default : "open"
    },
    "maxInvestment" : Number,
    "curentAmount" : Number,
    "ownerId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const projects = mongoose.model("projects", projectSchema)
module.exports = projects