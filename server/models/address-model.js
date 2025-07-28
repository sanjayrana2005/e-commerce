const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    city: {
        String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    },
    stauts:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true
});
const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel