import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 4000;
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log("app running on http://localhost:4000/");
});
