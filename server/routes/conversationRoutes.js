const express = require("express");
const {
    addConversation,
    getConversation,
    getConversationoftwo,
} = require("../controllers/conversationController");
const router = express.Router();

router.post("/addconversation", addConversation);

router.get("/conversation/:id", getConversation);

router.get("/conversationtwo/:id1/:id2", getConversationoftwo);

module.exports = router;
