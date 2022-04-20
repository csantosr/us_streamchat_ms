import { Document } from "mongodb";
import mongoose from "mongoose";

export interface IRoom extends Document {
  streamId: string,
  messages: {
    date?: string,
    content: string,
    author: string,
  }[],
  connections: string[],
}

const roomSchema = new mongoose.Schema<IRoom>({
  streamId: {
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
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;