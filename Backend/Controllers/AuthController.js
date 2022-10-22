import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
export const registerUser = async(req,res)=>{
    const {username,password,firstname,lastname} = req.body;
   
    const salt = await bcrypt.genSalt(10)
     const hashedPass = await bcrypt.hash(password,salt)

    const newUser = new userModel({username,password:hashedPass,firstname,lastname})

    try{
await newUser.save()
res.status(200).json(newUser)
    }catch(err){

        console.log(err.message)
        res.status(500).json({message:err.message})
    }
    
}

export const loginUser = async(req,res)=>{
    const {username,password}= req.body;
    try{
const user = await userModel.findOne({username:username})
if(user){
const validity = await bcrypt.compare(password,user.password)
validity?res.status(200).json(user):res.status(400).json("Wrong password")
}else{
    res.status(404).send("something went worng")
}
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:err.message})

    }
}