import { Chat } from "../../models/chatSchema.js";


export const GroupList = async (req , res)=>{
    const response = await Chat.find({});
    // const data = response;
    // console.log(data);

    res.status(200).json({response});
}