import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
