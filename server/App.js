const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    // console.log("A user connected");
    console.log(socket.id, "socket.id-------------------");
    // io.to(si).emit("Welcome", "hello this is socket server!");
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        console.log(user, "user-------------");
        console.log(socket.id, "userrsocket----------------");
        io.to(user.socketId).emit("getMessage", {
            senderId,
            message,
        });
    });

    socket.on("disconnect", () => {
        // console.log("A user disconnected!");
        removeUser(socket.Id);
        io.emit("getUsers", users);
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const messageRoutes = require("./routes/messageRoutes");
app.use("/api", messageRoutes);

const conversationRoutes = require("./routes/conversationRoutes");
app.use("/api", conversationRoutes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Running on port ${PORT}`);
});
