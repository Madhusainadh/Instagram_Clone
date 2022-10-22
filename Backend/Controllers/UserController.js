import userModel from "../Models/UserModel.js";

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

const {currentUser,currentUserAdminStatus,password} = req.body;

 


}