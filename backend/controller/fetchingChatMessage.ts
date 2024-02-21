import { Request, Response } from "express";
import { Chat } from "../models/chatSchema.js";
import { User } from "../models/userSchema.js";

export const FetchChatMessage = async(req : Request, res : Response)=>{
    // console.log(req.body);
    const {chat} = req.body;
    const groupChat = await Chat.find({chatName : chat});
    // console.log("Chat Details : " , groupChat);
    
    // if (groupChat[0].messages && groupChat[0].messages.length > 0) {

    //     groupChat[0].messages.forEach((message) => {
    //       // console.log('Sender:', message.sender);
    //       // console.log('Content:', message.content);
    //       // console.log('Timestamp:', message.timestamp );
    //       // console.log('---'); // Separator between messages
    //     });
    //   } else {
    //     console.log('No messages in this group chat.');
      // }


    // Return the messages or other relevant information
    res.status(200).json({ groupDetails : groupChat });
}
