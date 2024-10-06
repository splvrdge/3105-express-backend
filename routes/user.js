const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const authToken = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authToken, getUserProfile);

module.exports = router;
