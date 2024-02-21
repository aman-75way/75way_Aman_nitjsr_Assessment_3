import { Request, Response } from "express";
import { Chat } from "../models/chatSchema.js";
import { User } from "../models/userSchema.js";

export const CreateChat = async (req: Request, res: Response) => {
  
    const {chatName , participants} = req.body;
    // console.log("req.body " , req.body);

    try {

      const existingChat = await Chat.findOne({chatName});
        // console.log(existingChat);
        if(existingChat) {
          return res.status(400).json({Error : "Chat existes ALready"});
        }

        const participantIds: string[] = [];
    
        for (const participantName of participants) {
            const userName = await User.findOne({ name: participantName });
      
            if (userName) {
              participantIds.push(userName._id.toString());
            } else {
              console.log(`User with name ${participantName} not found.`);
              return res.status(400).json({Error : `User with name ${participantName} not found.`});
            }
        }

        console.log("Id : " , participantIds);
        
        const newChat = new Chat({
          chatName,
          participants : participantIds,
          messages: [], // Empty array for messages
        });

        const response = await newChat.save();
        console.log(response);
        return res.status(200).json({response});
      } catch (error) {
        // Handle errors
        console.error('Error fetching participant IDs:', error);
        throw error; // Propagate the error if needed
      }
};
