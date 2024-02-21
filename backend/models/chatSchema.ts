import mongoose from "mongoose";
import { User } from "./userSchema.js";

const chatSchema = new mongoose.Schema({
  chatName :{
    type : String,
    required : true
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
      },
      content: {
        type: String,
        // required: true,
      }
    },
  ],
});

export const Chat = mongoose.model('Chat', chatSchema);

