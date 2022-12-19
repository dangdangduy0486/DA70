const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  userID: {
    type: String,
  },
  requestType: {
    type: String,
  },
  type: {
    type: String,
  },
  firstUnit: {
    type: String,
  },
  secondUnit: {
    type: String,
  },
  amount: {
    type: Number,
  },
  total: {
    type: Number,
  },
  senderAddress: {
    type: String,
  },
  recieverAddress: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Request = mongoose.model("Request", RequestSchema);
