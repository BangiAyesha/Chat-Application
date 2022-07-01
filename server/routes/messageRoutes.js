const express = require("express");
const router = express.Router();
const {
    addMessage,
    getUserMessages,
} = require("../controllers/messageController");

router.post("/addmessage", addMessage);

router.get("/messages/:id", getUserMessages);

module.exports = router;
