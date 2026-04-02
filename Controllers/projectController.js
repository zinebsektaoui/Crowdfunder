const Project = require("../Models/Project")

const create = async(req, res) => {
    try{
        const {title, description, capital, maxInvestment, curentAmount} = req.body
        if(!title || !description || !capital || !maxInvestment || !curentAmount){
            return res.status(400).json({error : "You must fill all fields !"})
        }
        const project = {title, description, capital, maxInvestment, curentAmount, ownerId : req.user.userId}
        await Project.create(project)
        return res.status(200).json({success : "Project created", project})
    }catch(err){
        return res.status(400).json({error: err.message})
    }
}

const drop = async(req, res) => {
    try{
        const {id} = req.params
        const dropProject = await Project.findByIdAndDelete(id)
        if(!dropProject) {
            return res.status(404).json({error : "Project not found !"})
        }
        return res.status(200).json({success : "Project deleted"})
    }catch(err){
        return res.status(400).json({error : err.message})
    }
}

const update = async(req, res) => {
    try{
        const {id} = req.params
        const project = await Project.findById(id)
        if(!project) {
            return res.status(404).json({error : "Project not found !"})
        }
        if(project.status === "closed"){
            return res.status(400).json({message : "You can't update on a closed project !"})
        }
        const {title, description, capital, status, maxInvestment, curentAmount} = req.body
        if(!title || !description || !capital || !maxInvestment || !curentAmount){
            return res.status(400).json({error : "You must fill all fields !"})
        }
        project.title = title
        project.description = description
        project.capital = capital
        project.status = status
        project.maxInvestment = maxInvestment
        project.curentAmount = curentAmount
        project.save()
        return res.status(200).json({success : "Project updated "})
    }catch(err) {
        return res.status(400).json({error : err.message})
    }
}

module.exports = { create, drop, update }