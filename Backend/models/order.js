const mongoose = require("mongoose");

const order = mongoose.Schema({
    user:{
        type: mongoose.Type.ObjectId,
        ref: "user",
    },
    book:{
        type: mongoose.Type.ObjectId,
        ref: "books",
    },
    status:{
        type: String,
        default:"order placed",
        enum:["order placed","out for Delivery","delivered","cancelled"],
        },
    },
    {timestamp:true}
)
module.exports = mongoose.model("order",order);