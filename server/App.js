const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

const { startSocketServer } = require("./socket/socket");
startSocketServer();

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
