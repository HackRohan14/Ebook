const authenticateToken=require('./userauth');
const book = require("../models/books");
const Order= require("../models/order");
const user = require("../models/user");
const router = require("express").Router();

//place order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        const userOrders =[];
        //console.log(order);
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id,});
            await newOrder.save();
            userOrders.push(newOrder);
        }
        // Clear the cart after processing all orders
        await user.findByIdAndUpdate(id, {
            $push: { orders: { $each: userOrders } },
            $set: { cart: [] },
        });

        return res.json({
            status: "success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An Error Occurred",
        });
    }
});


//get order history of a  particular user

router.get("/get-order-history",authenticateToken, async(req,res)=>{
    try {
        
        const {id}=req.headers;
        const userData= await user.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        });
        const orderData=userData.orders.reverse();
        return res.json({
            data:orderData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"An Error Occured",
        });
    }
})

//admin role

router.get("get-all-order",authenticateToken,async (req,res)=>{
    try {
        const userData=await order.find().populate({
            path:"book"
        }).populate({
            path:"user",
        }).sort({
            createdAt:-1,
        });

        return res.json({
            status:"Success",
            data:userData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"An error Occured",
        });
    }
})

//update order status

router.put("/update-staus/:id",authenticateToken, async(req,res)=>{
    try{
        const {id}=req.params;
        await order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Success",
            message:"Statu updated Sucessfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"An Internal error occured",
        });
    }
});



module.exports=router;