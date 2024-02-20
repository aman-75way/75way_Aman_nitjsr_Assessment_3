import { Chat } from "../models/chatSchema.js";

export const FetchChatMessage = async(req, res)=>{
    console.log(req.body);
    const {chat} = req.body;
    const groupChat = await Chat.find({chatName : chat});

    // console.log(groupChat[0]);

    if (groupChat[0].messages && groupChat[0].messages.length > 0) {
        console.log('Messages:');
        groupChat[0].messages.forEach((message) => {
          console.log('Sender:', message.sender);
          console.log('Content:', message.content);
          console.log('Timestamp:', message.timestamp);
          console.log('---'); // Separator between messages
        });
      } else {
        console.log('No messages in this group chat.');
      }


    // Return the messages or other relevant information
    res.status(200).json({ groupChat });
}
