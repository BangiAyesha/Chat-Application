const express = require("express");
const {
    addConversation,
    getConversation,
    getConversationoftwo,
} = require("../controllers/conversationController");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/addconversation", addConversation);

router.get("/conversation/:id", verifyToken, getConversation);

router.get("/conversationtwo/:id1/:id2", verifyToken, getConversationoftwo);

module.exports = router;
