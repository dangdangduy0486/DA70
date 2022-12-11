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
router.get("/all-users", allUsers);

// edit user information
router.patch("/edit-user", editUser);

//delete user
router.delete("/delete-user", deleteUser);

//get all orders request
router.get("/all-order/:id", getAllOrders);

//response order
router.patch("/response-order", responseOrders);

//edit order
// router.patch("/update-order/:id", editOrder);

//delete order
// router.patch("/delete-order/:id", deleteOrder);

//response request recharge
router.patch("/response-wallet", responseWallet);

module.exports = router;
