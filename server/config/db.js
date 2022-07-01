const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/ChatApp";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MONGODB CONNECTED!");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = connectDB;
