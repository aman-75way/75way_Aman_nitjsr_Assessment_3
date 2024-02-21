import { Request, Response } from "express";
import { Chat } from "../models/chatSchema.js";

export const fetchChatByUserIds = async (req : Request , res : Response) => {

  //  console.log(req.body);
  const {userId1 , userId2} = req.body;
  try {
    const response = await Chat.findOne({
      participants: {
        $all: [userId1, userId2],
      },
    })
    // console.log("Message : " ,  response.messages);
    res.status(200).json({msg : response})
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching chat by user ids');
  }

};