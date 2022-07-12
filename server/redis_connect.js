const redis = require("redis");

const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
    // url: "redis://localhost:6379",
});

redisClient.on("connect", function (err) {
    if (err) {
        console.log("Could not establish connection with redis" + err);
    } else {
        console.log("Connected to Redis successfully");
    }
});

module.exports = redisClient;
