const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  coinID: {
    type: String,
  },
  symbol: {
    type: String,
  },
  name: {
    type: String,
  },
  images: {
    thumb: {
      type: String,
      default: "",
    },
    small: {
      type: String,
      default: "",
    },
    large: {
      type: String,
      default: "",
    },
  },
});

module.exports = Coin = mongoose.model("Coin", CoinSchema);
