import Room, { IRoom } from "."
import { getRoomById } from "./getRoom";

export const messageToRoom = async (streamId: string, userId: string, message: string): Promise<IRoom> => {
  const room = await getRoomById(streamId);

  room.messages.push({
    content: message,
    author: userId,
  });
  room.save();

  return room;
}