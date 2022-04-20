import Room, { IRoom } from "."

export const createRoom = async (id: string): Promise<IRoom> => {
  const room = new Room({
    streamId: id,
  })

  await room.save();

  return room;
}