const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signUp = async(req, res) =>{
    try{
        const {name, email, password, role} = req.body
        if(!name || !email || !password || !role) {
            return res.status(400).json({message : "You must enter a name, email, password and role"})
        }
        const uniqueMail = await User.findOne({email : email})
        if(uniqueMail) {
            return res.status(400).json({message : "The mail must be unique"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            
        });

        const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        );

        res.setHeader("Authorization", `Bearer ${token}`);        
        return res.status(201).json({ success: "User created successfully.", newUser, token });
    }catch(err){
        return res.status(400).json({error : err.message})
    }
}

module.exports = { signUp }