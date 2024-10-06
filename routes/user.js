const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const authToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authToken, getUserProfile);

module.exports = router;
