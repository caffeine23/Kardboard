const express = require("express");
const { register, login, fetchUser } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/fetchUser", verifyToken, fetchUser);

module.exports = router;
