const router=require("express").Router();
const user=require("../models/user");
const authenticateToken = require("./userauth");

//add book to favorite
router.put("/addbook-to-favorites", authenticateToken ,async (req,res)=>{
    try {
        const { bookid, id } = req.headers;
        console.log(bookid);
        const userdata = await user.findById(id);
        console.log(userdata)
        const isBookFavorite = userdata.favorites.includes(bookid);
    
        if (isBookFavorite) {
          res.status(400).send("Book already in favorites");
        } else {
          userdata.favorites.push(bookid);
          await userdata.save(); // Added await
          res.status(200).send("Book added to favorites");
        }
      } catch (error) {
        console.error("Error:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Corrected spelling
      }
});

//remove book from favorite
router.post("/removebook-from-favorites",authenticateToken,async (req,res)=>{
  try {
    const {bookid,id}=req.headers;
    const userdata=await user.findById(id);
    const isbookfavorite = userdata.favorites.includes(bookid);
    if(isbookfavorite){
        userdata.favorites.pull(bookid);
        userdata.save();
        res.status(200).send("Book removed from favorites");
    }
    else{
        res.status(400).send("Book not in favorites");
        }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
  }
    
});





module.exports=router;