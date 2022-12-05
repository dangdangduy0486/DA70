const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  userID: {
    type: String,
  },
  currencyID: {
    type: String,
  },
  amount: {
    type: String,
  },
  type: {
    type: String,
    default: "fiat",
  },
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);
