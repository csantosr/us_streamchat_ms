import Room, { IRoom } from "."
import { getRoomById } from "./getRoom";

export const connectToRoom = async (streamId: string, userId: string): Promise<IRoom> => {
  const room = await getRoomById(streamId);

  room.connections.push(userId);
  room.connections = [...new Set(room.connections)]
  room.save();

  return room;
}