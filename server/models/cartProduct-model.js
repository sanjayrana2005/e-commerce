const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("cartProduct", cartProductSchema);