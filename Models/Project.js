const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    "title" : String,
    "description" : String,
    "capital" : Number,
    "status" : {
        type : String,
        enum : ["open", "closed"]
    },
    "maxInvestment" : Number,
    "curentAmount" : Number,
    "ownerId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const projects = mongoose.model(projectSchema, "projects")

export default projects