import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import db from "./database/connect";
import { connectToRoom } from './database/models/room/connectToRoom';
import { createRoom } from './database/models/room/createRoom';
import { getAllRooms } from './database/models/room/getAllRooms';
import { getRoomById } from './database/models/room/getRoom';
import { messageToRoom } from './database/models/room/messageToRoom';

const PORT = 8080;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', async (socket) => {
  socket.on('allRooms', async () => {
    const rooms = await getAllRooms();
    socket.emit('allRooms', rooms);
  })
  socket.on('join', async ({streamId, userId}) => {
    const room = await connectToRoom(streamId, userId);
    socket.emit('roomInfo', room);
    await messageToRoom(streamId, 'ADMIN', `${userId} just joined, say hi!`)
    socket.broadcast.to(streamId).emit('message', {
      content: `${userId} just joined, say hi!`,
      author: 'ADMIN',
      date: new Date().toString(),
    });
    socket.join(streamId);
  });

  socket.on('message', async ({streamId, userId, message}) => {
    await messageToRoom(streamId, userId, message);
    socket.broadcast.to(streamId).emit('message', {
      content: message,
      author: userId,
      date: new Date().toString(),
    });
  })
});

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongo");
});
