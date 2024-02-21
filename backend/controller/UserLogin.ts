import { User } from "../models/userSchema.js";

export const userLogin = async function(req,res){
        
    const {name , mobile , password} = req.body;
    try{
        const existingUser = await User.findOne({name, mobile , password});
        // console.log(existingUser);
        if(!existingUser){
            res.status(400).json({message : 'Invailid Credentials'});
        }else{
            res.status(200).json({message: 'login successful' , token : await existingUser.generateAuthToken() , userId: existingUser._id});
        }
    }catch(err){
        console.log("Error : " , err);
        res.status(500).json({message: "Internal Server Error"});
    }
};