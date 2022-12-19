const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  refresh,
  logout,
} = require("../controllers/authController");

const router = express.Router();

//signup
router.post("/signup", signup);

//verify
router.get("/verify/:userID/:token", verifyEmail);

//login
router.post("/login", login);

//logout
router.post("/logout", logout);

//refresh
router.get("/refresh", refresh);

module.exports = router;
