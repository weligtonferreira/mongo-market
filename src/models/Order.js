const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    products: {
        type: Array
    },
    amount: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Order', OrderSchema);