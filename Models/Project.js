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
    "maxInvestment" : {
        type : Number,
        default : 50
    },
    "curentAmount" : {
        type : Number,
        default : 0
    },
    "ownerId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    "investments" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "investments"
    }]
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project