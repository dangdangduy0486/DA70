const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  getUser,
  allUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

//signup
router.post("/signup", signup);

//verify
router.get("/verify/:userID/:token", verifyEmail)

//login
router.post("/login", login);

//ADMIN ONLY!!
router.get("/", getUser);

router.delete("/", deleteUser);

router.get("/allusers", allUsers);

module.exports = router;
