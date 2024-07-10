const express=require('express')
const app=express();
const cors=require("cors");
require("dotenv").config();
require("./conn/conn");

//routes
const user=require("./routes/user");
const books=require("./routes/book");
const favoritea=require("./routes/favorites");
const cart=require("./routes/cart");
const order=require("./routes/order");

app.use(cors());
app.use(express.json());
app.use("/api/v1",books);
app.use("/api/v1",user);
app.use("/api/v1",favoritea);
app.use("/api/v1",cart);
app.use("/api/v1",order);
//port

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})