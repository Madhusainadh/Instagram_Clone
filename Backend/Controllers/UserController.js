import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
// get a User

export const getUser = async (req,res)=>{
    const id = req.params.id;
   
    try{
        const user = await userModel.findById(id)

        if(user){
            const {password,...otherDetails} = user._doc

            res.status(200).json(otherDetails)
        }else{
            res.status(404).json("No user exist")
        }
    }catch(err){
        console.log(err.message)
        res.status(500).json(err.message)
    }
}

export const updateUser = async(req,res)=>{
const id = req.params.id;

console.log(id)
const {currentUserId,currentUserAdminStatus,password} = req.body;


if(id===currentUserId||currentUserAdminStatus){
    try{

        if(password){
            const salt =await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password,salt)
        }
        console.log("try")
         const user = await userModel.findByIdAndUpdate(id,req.body,{new:true})
         console.log(user)
        res.status(200).json(user)
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
}else{
    res.status(403).json("Access Denied! you can only update your profile")
}
 
}

export const deleteUser=async(req,res)=>{
    const id = req.params.id
    const {currentUserId,currentUserAdminStatus}= req.body;
    if(currentUserId==id||currentUserAdminStatus){
        try{
await userModel.findByIdAndDelete(id)
res.status(200).json("User deleted successfully")
        }catch(err){
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
    }else{
        res.status(403).json("Access Denied! you can only delete your profile")
    }
}

export const followUser = async(req,res)=>{
    const id = req.params.id;
    const {currentUserId} = req.body;
    
}