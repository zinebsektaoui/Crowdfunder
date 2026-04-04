const mongoose = require("mongoose")

const investmentSchema = new mongoose.Schema({
    "percentage" : Number,// kaythseb 3la 7sab capital w investWith => investWith / capital * 100
    "investWith" : Number,//investor b shhal investa fl projet => amount
    "investorId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    "projectId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }
})
const investments = new mongoose.model("investments", investmentSchema)
module.exports = investments