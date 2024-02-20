import { Chat } from "../../models/chatSchema.js";
import { User } from "../../models/userSchema.js";

export const SendGroupMessage = async (req, res) => {
  try {
    const { chatName, message } = req.body;
    const { sender , content, timestamp } = message[0];

    // Check if the chatId is provided
    if (!chatName) {
      return res.status(400).json({ message: 'Chat ID is required' });
    }

    const existingUser = await User.find({name : sender});

    // Check if there is an existing chat with the given chatId
    const existingChat = await Chat.findOne({chatName});

    if(!existingUser){
      res.status(404).json({ message: 'User not found' });
    }

    const senderId = existingUser[0]._id;
    console.log("ID ; " , senderId);
    if (existingChat && existingUser) {
      // If the chat exists, append the new message to its messages array
      existingChat.messages.push({ sender : senderId , content, timestamp });
      await existingChat.save();
      res.status(200).json({ chatId: senderId });
    } else {
      // If no chat is found with the given chatId, return an error
      res.status(404).json({ message: 'Chat not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
