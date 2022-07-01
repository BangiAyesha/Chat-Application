const Messages = require("../models/Messages");

//add new message
const addMessage = function (req, res) {
    const message = new Messages(req.body);
    console.log(req.body);
    message.save((err) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
            // console.log(err.message);
        } else {
            res.status(200);
            res.send(req.body);
        }
    });
};

//get messages of user
const getUserMessages = function (req, res) {
    Messages.find({ conversationId: req.params.id }, (err, m) => {
        console.log(m);
        if (m) {
            res.send(m);
        }
    });
};

module.exports = { addMessage, getUserMessages };
