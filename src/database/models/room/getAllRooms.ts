import Room, { IRoom } from "."
import { createRoom } from "./createRoom";

export const getAllRooms = async (): Promise<IRoom[]> => {
  let rooms: IRoom[] | null = await Room.find().exec();


  return rooms;
}