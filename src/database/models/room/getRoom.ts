import Room, { IRoom } from "."
import { createRoom } from "./createRoom";

export const getRoomById = async (id: string): Promise<IRoom | undefined> => {
  let room: IRoom | undefined = (await Room.findOne({
    roomId: id,
  }).exec()) ?? undefined;

  return room;
}