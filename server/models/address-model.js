const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    city: {
        type:String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default:""
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    },
    status:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        default:""
    }
}, {
    timestamps: true
});
const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel