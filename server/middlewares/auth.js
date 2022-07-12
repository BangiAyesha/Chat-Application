const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";
const redisClient = require("../redis_connect");

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);
    req.userData = decoded;

    console.log(decoded, "decoded");

    req.token = token;

    let checkk = redisClient.get(
        "BL_" + decoded._id.toString(),
        (err, data) => {
            if (err) throw err;
            if (data === token) {
                res.send({ message: "Blacklisted Token" });
            }
            next();
        }
    );
    console.log(checkk);
}

module.exports = { verifyToken };
