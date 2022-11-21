const Cart = require("../models/cart");
const User = require("../models/User");
const mongoose = require("mongoose");

//get all cart items
const getAllcartItems = async (req, res) => {
  const cartItems = await Cart.find({}).sort({ createAt: -1 });

  res.status(200).json(cartItems);
};

const createCart = async (req, res) => {
  try{
    const user = await User.findOne({
      _id: req.params.id
    })
    if(!user){
      return res.status(401).send({ 
        message: "Invalid Email or Password" 
      });
    };
    await Cart.create({
      userID: req.params.id,
      name: req.body.name,
      price: req.body.name,
      amount: req.body.amount,
      total: req.body.total,
    });

    res.status(200).send({
      message: "Successfully!!"
    })

  }catch(error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllcartItems,
  createCart,
};