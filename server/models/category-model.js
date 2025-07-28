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

const categoryModel = mongoose.model("category",categorySchema);
module.exports = categoryModel