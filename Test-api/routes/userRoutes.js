const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  allUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

//signup
router.post("/signup", signup);

//login
router.post("/login", login);

//ADMIN ONLY!!
router.get("/", verifyToken, getUser);

router.delete("/", deleteUser);

module.exports = router;
