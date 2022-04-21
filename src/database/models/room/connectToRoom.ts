import Room, { IRoom } from "."
import { getRoomById } from "./getRoom";

export const connectToRoom = async (roomId: string, userId: string): Promise<IRoom | undefined> => {
  const room = await getRoomById(roomId);

  if (!room) {
    return room;
  }

  room.connections.push(userId);
  room.connections = [...new Set(room.connections)]
  room.save();

  return room;
}