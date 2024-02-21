import { Request, Response } from "express";
import { User } from "../models/userSchema.js";


export const getUserDetailsById = async (req : Request ,res : Response)=>{

    // console.log("Body : " , req.body);
    try{
        const {userId} = req.body;
        const userDetails = await User.findOne({_id : userId});
        if(!userDetails){
            return res.status(400).json({"msg" : "User not Found"});
        }   
        // console.log("Name : " , userDetails.name);
        res.status(200).json({Name : userDetails.name});
    }catch(err){
        console.log("Error : " , err);
        res.status(400).json({err});
    }
    
}