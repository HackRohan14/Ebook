const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const jwt=require("jsonwebtoken");
const authenticateToken = require("./userauth");
const Book = require("../models/books");

//add book (admin role)
router.post("/addbook",authenticateToken,async(req,res)=>{

    try{
        const {id}=req.headers;
        const user1 = await user.findById(id);
        if(user1.role!=="admin"){
            return res.status(400).json({message:"Not Having Authorization(Only admin Is Allowed)"});
        }
        const book1 = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            description:req.body.description,
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
        const book1 = await Book.findByIdAndUpdate(id1,req.body,{new:true});
        res.status(200).json({message:"Book Updated Sucessfully"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete("/delete-book",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.headers;
        await user.findByIdAndDelete(id);
        res.status(200).json({message:"Book Deleted Sucessfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }

});

//get all books
router.get("/get-all-books",async (req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1});
        res.status(200).json({books},{message:"Sucess"});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
});

//get recent 4 books
router.get("/get-all-books",async (req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        res.status(200).json({books},{message:"Sucess"});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
});



//get detail of a particular book
router.get("/get-book-by-id/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json({book},{message:"Sucess"});
        }
        catch(err){
            res.status(500).json({message:"Internal Server Error"});
            }
});

module.export=router;















module.exports=router;