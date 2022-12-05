const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userID: {
    type: String,
  },
  accountID: {
    type: String,
  },
});

module.exports = Account = mongoose.model("Account", AccountSchema);
