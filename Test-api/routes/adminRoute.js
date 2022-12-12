const express = require("express");
const {
  allUsers,
  editUser,
  deleteUser,
  getAllOrders,
  responseOrders,
  // editOrder,
  // deleteOrder,
  responseWallet,
} = require("../controllers/adminController");

const router = express.Router();

//get all users
router.get("/all-users/:email", allUsers);

// edit user information
router.patch("/edit-user/:email", editUser);

//delete user
router.delete("/delete-user/:email", deleteUser);

//get all orders request
router.get("/all-order/:email", getAllOrders);

//response order
router.patch("/response-order/:email", responseOrders);

//edit order
// router.patch("/update-order/:id", editOrder);

//delete order
// router.patch("/delete-order/:id", deleteOrder);

//response request recharge
router.patch("/response-wallet/:email", responseWallet);

module.exports = router;
