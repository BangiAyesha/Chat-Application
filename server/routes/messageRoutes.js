const express = require("express");
const router = express.Router();
const {
    addMessage,
    getUserMessages,
} = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/auth");

router.post("/addmessage", verifyToken, addMessage);

router.get("/messages/:id", verifyToken, getUserMessages);

module.exports = router;
