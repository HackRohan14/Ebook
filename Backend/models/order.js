const mongoose = require("mongoose");

const order = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
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