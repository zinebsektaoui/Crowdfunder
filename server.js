const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/authRoutes")
const projectRoute = require("./Routes/projectRoute")
const investRoute = require("./Routes/investRoute")
const adminRoute = require("./Routes/adminRoute")

dotenv.config()
const app = express()
app.use(express.json())

app.use("/user", userRoutes)
app.use("/project", projectRoute)
app.use("/investment", investRoute)
app.use("/admin", adminRoute)

const port = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URI

app.listen(port, async() => {
    console.log(`Server running on port ${port}`);
    try{
        let connexion = await mongoose.connect(MONGODB_URL)
        console.log("Well connected to DB");
    }catch(err){
        console.log("Connexion failed : ", err.message);
    }
})