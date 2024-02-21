const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3005;
const app = express();
const httpServer = createServer(app);


const isDev = app.settings.env === "development";
const URL = isDev ? "http://localhost:3000" : "https://sketchbook-with-nextjs-p5lv76c2u-ry-rahul.vercel.app";
app.use(cors({ origin: URL}));

const io = new Server(httpServer, {
    cors: {
        origin: URL,
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

httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
