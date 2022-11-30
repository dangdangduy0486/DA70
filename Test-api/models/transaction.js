const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  TxnHash: {
    type: String,
  },
  method: {
    type: String,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  age: {
    type: Date,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  value: {
    type: String,
  },
  TxnFree: {
    type: Number,
  },
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);
