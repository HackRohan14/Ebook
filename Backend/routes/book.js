const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const jwt=require("jsonwebtoken");
const authenticateToken = require("./userauth");
const books = require("../models/books");
const axios= require("axios");


//add book (admin role)
router.post("/addbook",authenticateToken,async(req,res)=>{

    try{
        const {id}=req.headers;
        const user1 = await user.findById(id);
        if(user1.role!=="admin"){
            return res.status(400).json({message:"Not Having Authorization(Only admin Is Allowed)"});
        }
        const book1 = new books({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            desc:req.body.desc,
            image:req.body.image,
            price:req.body.price,
            language:req.body.language,
        });
        await book1.save();
        res.status(200).json({message:"Book Added Sucessfully"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put("/update-book",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.headers;
        const user1 = await user.findById(id);
        if(user1.role!=="admin"){
            return res.status(400).json({message:"Not Having Authorization(Only admin Is Allowed)"});
        }
        const {id1}=req.body;
        const book1 = await books.findByIdAndUpdate(id1,req.body,{new:true});
        res.status(200).json({message:"Book Updated Sucessfully"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete("/delete-book/:bookid",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.headers;
        const user1 = await user.findById(id);
        if(user1.role!=="admin"){
            return res.status(400).json({message:"Not Having Authorization(Only admin Is Allowed"});
        }
        const {bookid} = req.params;
        console.log(bookid);
        await books.findByIdAndDelete(bookid);
        res.status(200).json({message:"Book Deleted Sucessfully"});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }

});

// get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books1 = await books.find().sort({ createdAt: -1 });
        res.status(200).json({ books1, message: "Success" }); // Correctly structured response
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Proper error response
    }
});


//get recent 4 books
router.get("/get-recent-books",async (req,res)=>{
    try{
        const books1 = await books.find().sort({createdAt:-1}).limit(4);
        res.status(200).json({books1});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
});



//get detail of a particular book
router.get("/get-book-by-id/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await books.findById(id);
        if(!book){
            return res.status(400).json({message:"book Not Found"});
        }
        res.status(200).json({book,message:"Sucess"});
        }
        catch(err){
            res.status(500).json({message:"Internal Server Error"});
            }
});

// Get favorite books of a particular user
router.get("/get-favorite-book", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const userdata = await user.findById(id).populate('favorites');
      return res.status(200).json({
        status: "success",
        data: userdata,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports=router;