const mongoose=require("mongoose");
require('dotenv').config();

const url = process.env.URL
const local ="mongodb://localhost:27017/";
const conn=async ()=>{
    try {
        await mongoose.connect(url);
        console.log("connected to database");

    } catch (error) {
        console.log(error);
    }
}

conn();