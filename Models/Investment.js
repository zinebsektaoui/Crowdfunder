const mongoose = require("mongoose")

const investmentSchema = new mongoose.Schema({
    "percentage" : Number,// kaythseb 3la 7sab capital w investWith => investWith / capital * 100
    "investWith" : Number,//investor b shhal investa fl projet
    "investorId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    "projcetId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }
})
const investments = new mongoose.model(investmentSchema, "investments")
export default investments