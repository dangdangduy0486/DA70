const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accountID: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = Account = mongoose.model("Account", AccountSchema);
