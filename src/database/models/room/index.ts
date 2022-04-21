import { Document } from "mongodb";
import mongoose from "mongoose";

export interface IRoom extends Document {
  roomId: string,
  messages: {
    date?: string,
    content: string,
    author: string,
  }[],
  connections: string[],
  isStream: boolean,
}

const roomSchema = new mongoose.Schema<IRoom>({
  roomId: {
    type: String
  },
  messages: [{
    date: {
      type: Date,
      default: Date.now(),
    },
    content: String,
    author: String,
  }],
  connections: [{
    type: String,
  }],
  isStream: {
    type: Boolean,
  }
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;