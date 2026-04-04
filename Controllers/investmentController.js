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
        const remainingAmount = project.capital - project.curentAmount// shehel baqi to remain l capital dyel project
        if(investWith > remainingAmount){
            return res.status(400).json({error : `You can only invest up to ${remainingAmount} DH. Remaining amount to reach the capital: ${remainingAmount} DH`})
        }
        const percentage = (investWith / project.capital) * 100
        if(percentage > project.maxInvestment){
            return res.status(400).json({error : `You can't invest more than ${project.maxInvestment}% in this project !`})//ila investa b ktar men dekshy lly baqi l project => stop
        }if(investWith > user.balance){
            return res.status(400).json({error : "You don't have enough balance to invest this amount !"})
        }
        const investment = await Investment.create({
            investorId : req.user.userId,
            projectId : project._id,
            investWith : investWith,
            percentage : percentage
        })
        user.balance -= investWith
        await user.save()
        project.curentAmount += investWith
        project.investments.push(investment._id)// push id dyel investment
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


// consulter la liste de ses investissements
const getInvestmentsDetails = async (req, res) => {
    try{
        const investments = await Investment.find({investorId : req.user.userId}).populate("projectId", "title description")
        if(investments.length === 0){
            return res.status(404).json({error : "No investments found !"})
        }
        return res.status(200).json({"Your investments" :  investments})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

// consulter les détails d’un projet : voir pour chaque projet => (le montant investi, le pourcentage détenu)
const getProjectDetails = async (req, res) => {
    try{
        const {projectId} = req.params
        const project = await Project.findById(projectId).select("title description curentAmount").populate("ownerId", "-_id name email").populate("investments", "percentage")
        if(!project){
            return res.status(404).json({error : "Project not found !"})
        }
        return res.status(200).json({project})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { investInProject, getOpenProjects, getProjectDetails, getInvestmentsDetails }