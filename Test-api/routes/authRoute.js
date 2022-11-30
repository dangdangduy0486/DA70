const express = require("express");
const {
  signup,
  verifyEmail,
  login,
} = require("../controllers/authController");

const router = express.Router();

//signup
router.post("/signup", signup);

//verify
router.get("/verify/:userID/:token", verifyEmail);

//login
router.post("/login", login);

module.exports = router;
