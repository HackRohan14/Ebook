const router=require("express").Router();
const {User}=require("../models/user");
const {authenticateToken} = require("./userauth");

//add book to favorite
router.post("/addbook",authenticateToken,async (req,res)=>{
    const {bookid,id}=req.headers;
    const userdata=await user.findById(id);
    const isbookfavorite = userdata.favourites.includes(bookid);
    if(isbookfavorite){
        res.status(400).send("Book already in favorites");
    }
    else{
        userdata.favourites.push(bookid);
        userdata.save();
        res.status(200).send("Book added to favorites");
    }
});

//remove book from favorite
router.post("/removebook",authenticateToken,async (req,res)=>{
    const {bookid,id}=req.headers;
    const userdata=await user.findById(id);
    const isbookfavorite = userdata.favourites.includes(bookid);
    if(isbookfavorite){
        userdata.favourites.pull(bookid);
        userdata.save();
        res.status(200).send("Book removed from favorites");
    }
    else{
        res.status(400).send("Book not in favorites");
        }
});





module.exports=router;