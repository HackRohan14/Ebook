const router = require("express").Router();
const user = require("../models/user");
const authenticateToken = require("./userauth");

router.put("/add-to-cart",authenticateToken,async (req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData=await user.includes(bookid);
        const isbookfavorite= userData.cart.includes(bookid);

        if(!isbookfavorite){
            return res.json({
                status:"Success",
                message:"book is already in cart"
            });
        }
        await user.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        });
        return res.json({
            status:"success",
            message:"Book added to cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
});

//delete from cart

router.put("/remove-from-cart/:bookid",authenticateToken,async (req,res)=>{
    try{const {bookid}=req.params;
    const {id}=req.headers;
    await user.findByIdAndUpdate(id,{
        $pull :{cart:bookid},
    });
    return res.json({
        status:"success",
        message:"Book removed from cart"
    });}
    catch(err){
        res.status(500).json({
            message:"internal server Error",
        });
    }
})


//get a cart of a particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.headers;
        const userData=await user.findById(id).populate("cart");
        const cart=userData.cart.reverse();

        return res.json({
            status:"success",
            data:cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error",
        });
    }
});


module.exports=router;
