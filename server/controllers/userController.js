const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { signUp, signIn } = require("../validation/validation");
const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";
const redisClient = require("../redis_connect");

//register a new user
const register = function (req, res) {
    const result = signUp.validate(req.body);
    if (result.error === undefined) {
        Users.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    res.send({ err: 0, message: "Email already in use!" });
                } else {
                    let hashpassword = bcrypt.hashSync(req.body.password, 10);
                    req.body.password = hashpassword;

                    let ins = new Users(req.body);
                    ins.save((err) => {
                        if (err) res.send({ flag: 0, message: err.message });
                        res.send({
                            flag: 1,
                            message: "User Registered Successfully",
                        });
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send(result.error.details[0].message);
    }
};

//login an existing user
const login = function (req, res) {
    const result = signIn.validate(req.body);
    if (result.error === undefined) {
        Users.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    const match = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );
                    if (match) {
                        const token = jwt.sign({ _id: user._id }, jwtSecret, {
                            expiresIn: "10d",
                        });
                        // const refresh_token = GenerateRefreshToken(user._id);

                        console.log(token);
                        res.send({
                            flag: 1,
                            message: "Login Successful!",
                            user: user,
                            token: token,
                            // data: refresh_token,
                        });
                    } else {
                        res.send({ flag: 0, message: "Password Incorrect!" });
                    }
                } else {
                    res.send({ err: 0, message: "User not registered!" });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send(result.error.details[0].message);
    }
};

//get user details
const getUser = function (req, res) {
    Users.findById({ _id: req.params.id })
        .then((user) => {
            if (user) {
                res.send(user);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

//logout user
const logout = function (req, res) {
    console.log(req);
    const user_id = req.body._id;
    const token = req.body.token;

    redisClient.del(user_id.toString());
    redisClient.set("BL_" + user_id.toString(), token);

    res.send({ message: "Success" });
};

function GenerateRefreshToken(user_id) {
    const refresh_token = jwt.sign({ _id: user_id }, jwtSecret, {
        expiresIn: "10d",
    });

    redisClient.get(user_id.toString(), (err, data) => {
        if (err) throw err;
        redisClient.set(
            user_id.toString(),
            JSON.stringify({ token: refresh_token })
        );
    });
    return refresh_token;
}

module.exports = { register, login, getUser, logout };
