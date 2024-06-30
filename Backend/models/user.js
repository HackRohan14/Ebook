const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.bing.com/images/search?view=detailV2&ccid=obV5KTWZ&id=962D5D409BC691108CC5F8793AE4FA6586FD6E6C&thid=OIP.obV5KTWZPdbxODJekwix4gHaHa&mediaurl=https%3a%2f%2fwww.pngarts.com%2ffiles%2f5%2fUser-Avatar-PNG-Free-Download.png&exph=512&expw=512&q=avatar+of+user&simid=608030764194491261&FORM=IRPRST&ck=238C92459B7D052D92136B667ECC0B5C&selectedIndex=16&itb=1"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favorites:[{type:mongoose.type.ObjectId,
        ref:"books",
    }
    ],
    cart:[{type:mongoose.type.ObjectId,
        ref:"books",
        }],
    orders:[{
        type:mongoose.type.ObjectId,
        ref:"order",
    }],
    },
    {timestamps:true},
);
const express=mongoose.model("user",user);