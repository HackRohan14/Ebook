const mongoose=require("mongoose");



const conn=async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("connected to database");

    } catch (error) {
        console.log(error);
    }
}

conn();