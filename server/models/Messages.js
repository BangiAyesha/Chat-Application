const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
        },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        message: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Messages", MessageSchema);
