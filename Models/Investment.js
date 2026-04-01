const mongoose = require("mongoose")

const investmentSchema = new mongoose.Schema({
    "amount" : String,
    "percentage" : Number,
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
export default investmentSchema