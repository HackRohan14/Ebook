const express=require('express')
const app=express();
require("dotenv").config();
require("./conn/conn");

//routes
const user=require("./routes/user");
const books=require("./routes/book");
app.use(express.json());
app.use("/api/v1",books);
app.use("/api/v1",user);
//port

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})