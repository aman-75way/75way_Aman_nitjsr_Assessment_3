import { Chat } from "../models/chatSchema.js";

export const CreateChat = async (req, res) => {
  try {
    const { chatName , participants, message } = req.body;
    const { sender, content, timestamp } = message[0];

    // Check if there's an existing chat
    const existingChat = await Chat.findOne({
      chatName
      // participants: {
      //   $all: [participants[0], participants[1]],
      // },
    });

    if (existingChat) {
      // If chat exists, append the new message
      existingChat.messages.push({ sender, content, timestamp });
      const updatedChat = await existingChat.save();
      res.status(200).json({ chat: updatedChat });
    } else {
      // If no chat exists, create a new chat
      const chat = new Chat({
        chatName : chatName,
        participants: [participants[0], participants[1]],
        messages: [{ sender, content, timestamp }],
      });

      // Save the new chat to the database
      const newChat = await chat.save();
      res.status(200).json({ chat: newChat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
