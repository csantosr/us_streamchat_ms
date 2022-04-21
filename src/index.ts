import express from 'express';
import bodyParser from 'body-parser';
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

app.get('/api/rooms', async (req, res) => {
  const rooms = await getAllRooms();
  res.status(200).send(rooms)
});

app.post('/api/rooms/', async (req, res) => {

  if (!('roomId' in req.body)) {
    res.status(400).send({
      message: 'Not all parameters are present or valid'
    });
    return;
  }
  const {roomId, isStream} = req.body;
  try {
    const room = await createRoom(roomId, !!isStream)
    if (!room) {
      res.status(500).send();
      return;
    }
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/api/rooms/:roomId', async (req, res) => {
  const {roomId} = req.params;
  const room = await getRoomById(roomId);
  if (!room) {
    res.status(404).send();
    return;
  }
  res.status(200).send(room)
});

app.post('/api/rooms/:roomId/join', async (req, res) => {

  if (!('roomId' in req.params) || req.params.roomId === '' || !('userId' in req.body)) {
    res.status(400).send({
      message: 'Not all parameters are present or valid'
    });
    return;
  }
  const {userId} = req.body;
  const {roomId} = req.params;
  try {
    const room = await connectToRoom(roomId, userId);
    if (!room) {
      res.status(404).send();
      return;
    }
    await messageToRoom(roomId, 'ADMIN', `${userId} just joined, say hi!`); 
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/api/rooms/:roomId/message', async (req, res) => {
  console.log(req.params, req.body)
  if (!('roomId' in req.params) || req.params.roomId === '' || !('userId' in req.body) || !('content' in req.body)) {
    res.status(400).send({
      message: 'Not all parameters are present or valid'
    });
    return;
  }

  const {userId, message} = req.body;
  const {roomId} = req.params;

  try {
    const room = await messageToRoom(roomId, userId, message);
    if (!room) {
      res.status(404).send();
      return;
    } 
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
})

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongo");
});
