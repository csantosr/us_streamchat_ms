import Room, { IRoom } from "."
import { getRoomById } from "./getRoom";

export const messageToRoom = async (roomId: string, userId: string, message: string): Promise<IRoom | undefined> => {
  const room = await getRoomById(roomId);

  if (!room) {
    return room;
  }

  room.messages.push({
    content: message,
    author: userId,
  });
  room.save();

  return room;
}