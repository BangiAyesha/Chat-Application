const Conversation = require("../models/Conversation");

// add new conversation
const addConversation = function (req, res) {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    newConversation.save((err) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
        } else {
            res.send({ flag: 1, message: "Conversation added!" });
        }
    });
};

//get conversation of a user
const getConversation = function (req, res) {
    Conversation.find({ members: { $in: [req.params.id] } }, (err, convo) => {
        if (convo) {
            res.send(convo);
        }
    });
};

//get conversation of 2 users
const getConversationoftwo = function (req, res) {
    Conversation.findOne(
        { members: { $all: [req.params.id1, req, params.id2] } },
        (err, convo) => {
            if (convo) {
                res.send(convo);
            }
        }
    );
};

module.exports = { addConversation, getConversation, getConversationoftwo };
