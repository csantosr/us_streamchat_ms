import Room, { IRoom } from "."
import { createRoom } from "./createRoom";

export const getAllRooms = async (): Promise<IRoom[]> => {
  let rooms: IRoom[] = await Room.find().exec();


  return rooms;
}