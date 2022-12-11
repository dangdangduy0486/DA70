const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: {
    type: String,
  },
  purchaseUnit: {
    type: String,
  },
  sellUnit: {
    type: String,
  },
  price: {
    type: String,
  },
  amount: {
    type: String,
  },
  sender: {
    type: String,
  },
  reciever: {
    type: String,
  },
  total: {
    type: String,
  },
  orderType: {
    type: String,
  },
  status: {
    type: String,
    default: "PENDING",
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
