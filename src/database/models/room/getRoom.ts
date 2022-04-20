import Room, { IRoom } from "."
import { createRoom } from "./createRoom";

export const getRoomById = async (id: string): Promise<IRoom> => {
  let room: IRoom | null = await Room.findOne({
    streamId: id,
  }).exec();

  if (!room) {
    room = await createRoom(id);
  }

  return room;
}