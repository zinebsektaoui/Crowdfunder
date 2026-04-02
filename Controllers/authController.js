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
        { expiresIn: "1d" },
        );

        res.setHeader("Authorization", `Bearer ${token}`);        
        return res.status(201).json({ success: "User created successfully.", newUser });
    }catch(err){
        return res.status(400).json({error : err.message})
    }
}

const signIn = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email : email})
    if(!user){
        return res.status(400).json({error : "Email doesn't exist !"})
    }else{
        try{
            const ismatching = await bcrypt.compare(password, user.password)
            if(!ismatching){
                return res.status(400).json({error : "Invalid password"})
            }
            const token = jwt.sign({ 
                userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" },
            );
            res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).json({ message: "User logged in successfully.", user });
        }catch(err){
            return res.status(400).json({"Error on login" : err.message})
        }
    }
}

module.exports = { signUp, signIn }