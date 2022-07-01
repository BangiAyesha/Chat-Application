const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/getuser/:id", getUser);

module.exports = router;
