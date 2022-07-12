const Conversation = require("../models/Conversation");

// add new conversation
const addConversation = function (req, res) {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    newConversation
        .save()
        .then(() => {
            res.send({ flag: 1, message: "Conversation added!" });
        })
        .catch((err) => {
            console.log(err);
        });
};

//get conversation of a user
const getConversation = function (req, res) {
    Conversation.find({ members: { $in: [req.params.id] } })
        .then((convo) => {
            if (convo) {
                res.send(convo);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

//get conversation of 2 users
const getConversationoftwo = function (req, res) {
    Conversation.findOne({
        members: { $all: [req.params.id1, req, params.id2] },
    })
        .then((convo) => {
            if (convo) {
                res.send(convo);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { addConversation, getConversation, getConversationoftwo };
