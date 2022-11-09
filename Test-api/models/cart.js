const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
    }

})

module.exports = Cart = mongoose.model('Cart', CartSchema);