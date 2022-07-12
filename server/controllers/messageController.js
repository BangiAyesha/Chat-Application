const Messages = require("../models/Messages");

//add new message
const addMessage = function (req, res) {
    const message = new Messages(req.body);
    // console.log(req.body, "reqbody===========");
    message
        .save()
        .then(() => {
            res.status(200);
            res.send(req.body);
        })
        .catch((err) => {
            console.log(err);
        });
};

//get messages of user
const getUserMessages = function (req, res) {
    Messages.find({ conversationId: req.params.id })
        .then((m) => {
            // console.log(m, "mmmmmmmmmmmmm");
            if (m) {
                res.send(m);
            }
        })
        .catch((err) => {
            // console.log(err);
        });
};

module.exports = { addMessage, getUserMessages };
