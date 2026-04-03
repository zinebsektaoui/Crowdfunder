const Investment = require("../Models/Investment");
const Project = require("../Models/Project");
const User = require("../Models/User")

const investInProject = async (req, res) => {
    try {// uesh yqder y investy f 1 projet 2 fois ?
        const {investWith} = req.body
        const {projectId} = req.params
        const user = await User.findById({ _id : req.user.userId })
        const project = await Project.findById({ _id : projectId })
        if(!project) {
            return res.status(404).json({error : "Project not found !"})
        }if(project.status === "closed"){
            return res.status(400).json({error : "You can't invest in a closed project !"})
        }
        const percentage = (investWith / project.capital) * 100
        if(percentage > project.maxInvestment){
            return res.status(400).json({error : `You can't invest more than ${project.maxInvestment}% in this project !`})
        }if(investWith > user.balance){
            return res.status(400).json({error : "You don't have enough balance to invest this amount !"})
        }
        const investment = await Investment.create({
            investorId : req.user.userId,
            projcetId : project._id,
            investWith : investWith,
            percentage : percentage
        })
        user.balance -= investWith
        await user.save()
        project.curentAmount += investWith
        if(project.curentAmount >= project.capital){
            project.status = "closed"
        }
        await project.save()
        res.status(201).json({message : "Investment successful", investment, project})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOpenProjects = async (req, res) => {
    try{
        const projects = await Project.find({status : "open"})
        res.status(200).json({"Open projects" : projects})
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}

const getProjectDetails = async (req, res) => {
    try{
        const {projectId} = req.params
        const project = await Project.findById(projectId).populate("ownerId", "name email").populate("investments")
        if(!project){
            return res.status(404).json({error : "Project not found !"})
        }
        return res.status(200).json({project})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }//to update
}
module.exports = { investInProject, getOpenProjects, getProjectDetails }