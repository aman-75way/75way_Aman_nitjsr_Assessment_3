import { Chat } from "../models/chatSchema.js";

export const GetChatDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed in the request parameters

    // Fetch the list of chats where the given user is a participant
    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'username')
      .populate('messages.sender', 'username'); // Assuming 'messages' is an array of chat messages with a 'sender' field

    // Respond with the list of chats
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
