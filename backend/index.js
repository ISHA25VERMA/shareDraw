import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let roomElementsMap = new Map();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join-room", (roomId, callback) => {
    socket.join(roomId);
    console.log("user joined room", roomId);

    return callback({
      status: "ok",
      elements: roomElementsMap.get(roomId) || [],
    });
  });

  socket.on("drawing", (data) => {
    console.log("drawing", data);
    const { roomId, element } = data;
    if (roomElementsMap.has(roomId)) {
      roomElementsMap.get(roomId).push(element);
    } else {
      roomElementsMap.set(roomId, [element]);
    }
    socket.broadcast.to(roomId).emit("drawing", data);
  });
});

httpServer.listen(4000, () => {
  console.log("app running on http://localhost:4000/");
});

app.get("/", (req, res) => {
  res.send("<h1>backend server</h1>");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// server.listen(port, () => {
//   console.log("app running on http://localhost:4000/");
// });
