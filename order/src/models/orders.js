const mongoose = require('mongoose');
const { collection } = require('../../../auth/src/models/user');
const OrderSchema = new mongoose.Schema({
    ///list of products.. precisely id of products
    products:[{
        type:mongoose.Schema.ObjectId,
        ref:'products',
        required: true,
    }],

    totalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

},{collection:'orders'});

const Order = mongoose.model("Order",OrderSchema);

module.exports= Order;