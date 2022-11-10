const Cart = require("../models/cart");
const mongoose = require("mongoose");

//get all cart items
const getAllcartItems = async (req, res) => {
  const cartItems = await Cart.find({}).sort({ createAt: -1 });

  res.status(200).json(cartItems);
};

const createCart = async (req, res) => {
  const { name, price, amount, total } = req.body;
  if (!name || !price || !amount) {
    return res.status(403).json({ error: "missing something" });
  }
//   if (currency.name == name) {
//     const cartItem = await Cart.findOneAndUpdate(
//         { name: name },
//         {
//           $set: {
//             amount: Cart.amount + req.body.amount
//           }
//         }
//       );
//       res.status(200).json(cartItem);
//   } else {
    try {
      const cartItem = await Cart.create({
        name,
        price,
        amount,
        total
      });
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
//   }
};

module.exports = {
  getAllcartItems,
  createCart,
};