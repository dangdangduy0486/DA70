const express = require("express");
const {
  allUsers,
  editUser,
  deleteUser,
  response,
} = require("../controllers/adminController");

const router = express.Router();

//get all users
router.get("/all-users/:email", allUsers);

// edit user information
router.patch("/edit-user/:email", editUser);

//delete user
router.delete("/delete-user/:email", deleteUser);

//response request recharge
router.patch("/response/:email", response);

module.exports = router;
