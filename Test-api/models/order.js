const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  amount: {
    type: String,
  },
  currency: {
    type: String,
  },
  total: {
    type: String,
  },
  status: {
    type: String,
    default: "PENDING",
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
