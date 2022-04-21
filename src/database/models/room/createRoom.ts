import Room, { IRoom } from "."

export const createRoom = async (id: string, isStream: boolean): Promise<IRoom> => {
  const room = new Room({
    roomId: id,
    isStream,
  })

  await room.save();

  return room;
}