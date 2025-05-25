const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

module.exports = mongoose.model("category",categorySchema);