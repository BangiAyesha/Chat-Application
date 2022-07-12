const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";
const redisClient = require("../redis_connect");

// function verifyToken(req, res, next) {
//     // console.log(req.headers);
//     // const authHeader = req.headers["authorization"];
//     // const token = authHeader && authHeader.split(" ")[1];

//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token, "==================================");

//     const decoded = jwt.verify(token, jwtSecret);
//     req.userData = decoded;

//     console.log(decoded, "decoded");

//     req.token = token;
//     console.log(token, "tokentokentoken");

//     redisClient.get("BL_" + decoded._id.toString(), (err, data) => {
//         if (err) throw err;
//         if (data === token) {
//             res.send({ message: "Blacklisted Token" });
//         }
//     });
//     next();
// }

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token, "tokennnnnn");
    if (token == null) {
        res.json({ err: 1, msg: "Token not matched" });
    } else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ err: 1, msg: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

function verifyRefreshToken(req, res, next) {
    const token = req.body.token;
    if (token === null) res.send({ message: "Invalid request" });

    const decoded = jwt.verify(token, jwtSecret);
    req.userData = decoded;

    redisClient.get(decoded._id.toString(), (err, data) => {
        if (err) throw err;
        if (data === null)
            res.send({ message: "Invalid request. Token is not in store." });
        if (JSON.parse(data).token != token)
            res.send({ message: "Invalid request." });

        next();
    });
}

module.exports = { verifyToken, verifyRefreshToken };
