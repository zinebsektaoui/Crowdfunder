const Investor = require("../Models/Investment");
const User = require("../Models/User");
const Project = require("../Models/Project");

const getInvestors = async(req, res) => {
    const investors = await Investor.find().select("-percentage -_id -__v").populate("investorId", "name email").populate("projectId", "title");
    if(investors.length === 0){
        return res.status(404).json({message: "No investors found"});
    }
    return res.status(200).json({investors})
}

const getProjectOwners = async(req, res) => {
    const projectOwners = await User.find({role:"Project Owner"})
    if(projectOwners.length === 0){
        return res.status(404).json({message: "No project owners found"});
    }
    return res.status(200).json({projectOwners})
}

//onsulter le portefeuille d’un porteur de projet (projets créés, montants levés) 
const getProjectOwnerWallet = async(req, res) => {
    const {id} = req.params
    const user = await User.findById(id).select("name role")
    if(!user){
        return res.status(404).json({message: "User not found"});
    }if(user.role !== "Project Owner"){
        return res.status(404).json({message: "Thje User u'r searching for is not a project owner"});
    }
    const projectDetail = await Project.find({ownerId : id}).select("-_id title capital curentAmount")
    if(!projectDetail){
        return res.status(404).json({message: "Project owner not found"});
    }
    return res.status(200).json({user, projectDetail})
}

module.exports = { getInvestors, getProjectOwners, getProjectOwnerWallet }