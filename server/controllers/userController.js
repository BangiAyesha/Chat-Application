const Users = require("../models/Users");
const bcrypt = require("bcrypt");

//register a new user
const register = function (req, res) {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ err: 0, message: "Email already in use!" });
        } else {
            let hashpassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashpassword;

            let ins = new Users(req.body);
            ins.save((err) => {
                if (err) res.send({ flag: 0, message: err.message });
                res.send({ flag: 1, message: "User Registered Successfully" });
            });
        }
    });
};

//login an existing user
const login = function (req, res) {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            const match = bcrypt.compareSync(req.body.password, user.password);
            if (match) {
                res.send({ flag: 1, message: "Login Successful!", user: user });
            } else {
                res.send({ flag: 0, message: "Password Incorrect!" });
            }
        } else {
            res.send({ err: 0, message: "User not registered!" });
        }
    });
};

//get user details
const getUser = function (req, res) {
    Users.findById({ _id: req.params.id }, (err, user) => {
        if (user) {
            res.send(user);
        } else {
            res.send(err.message);
        }
    });
};

module.exports = { register, login, getUser };
