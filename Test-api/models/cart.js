const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    amount: {
        type: String
    },
    total: {
        type: String
    },
    status: {
        type: String,
        default: "PENDING",
    }

})

module.exports = Cart = mongoose.model('Cart', CartSchema);