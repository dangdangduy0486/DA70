const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  userID: {
    type: String,
  },
  requestType: {
    type: String,
  },
  purchaseUnit: {
    type: String,
  },
  sellUnit: {
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
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = Request = mongoose.model("Request", RequestSchema);
