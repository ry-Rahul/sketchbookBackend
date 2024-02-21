const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = 3005;
const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "http://localhost:3000" }));

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("beginPath", (data) => {
        socket.broadcast.emit("beginPath", data);
    });

    socket.on("drawLine", (data) => {
        socket.broadcast.emit("drawLine", data); 
    });
    socket.on("changeConfig", (data) => {
        socket.broadcast.emit("changeConfig", data); 
    });
});

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
