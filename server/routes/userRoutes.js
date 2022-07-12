const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUser,
    logout,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/getuser/:id", verifyToken, getUser);

router.get("/logout", verifyToken, logout);

module.exports = router;
