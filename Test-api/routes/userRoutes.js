const express = require("express");
const {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPasswordRequest,
  resetPassword,
  getUser,
  allUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

//signup
router.post("/signup", signup);

//verify
router.get("/verify/:userID/:token", verifyEmail);

//login
router.post("/login", login);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password request
router.get("/reset-password/:userID", resetPasswordRequest);

//reset password
router.patch("/reset-password/:userID", resetPassword);

//get user info
router.get("/:email", getUser);

// //get user info
// router.get("/:email", getUser);

//ADMIN ONLY!!
router.delete("/", deleteUser);

router.get("/admin/allusers", allUsers);

module.exports = router;
