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
router.get("/all-users/:id", allUsers);

// edit user information
router.patch("/edit-user/:id", editUser);

//delete user
router.delete("/delete-user/:id/", deleteUser);

//get all orders request
router.get("/all-order/:id", getAllOrders);

//response order
router.patch("/response-order/:id", responseOrders);

//edit order
// router.patch("/update-order/:id", editOrder);

//delete order
// router.patch("/delete-order/:id", deleteOrder);

//response request recharge
router.patch("/response_wallet/:id", responseWallet);

module.exports = router;
