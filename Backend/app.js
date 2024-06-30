const express=require('express')
const app=express();
require("dotenv").config();

//port
const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})