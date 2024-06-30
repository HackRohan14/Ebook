const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const authenticateToken = require("./userauth");
//sign up
router.post("/sign-up",async (req, res) => {
    try {
        //destructuring
        //console.log(user instanceof(mongoose.model));
        const {username,password,email,address} =req.body;

       
        //check if username length is more than 3

        if(username.length<3){
            return res.status(400).json({message:"username must be more than 3 characters"});
        }
        //console.log("working");
        //console.log(username);
        // check if username exist


        const existingUsername = await user.findOne({username:username});
               
        if(existingUsername){
        return res.status(400).json({message:"username already exist"});
        }

        //console.log("find one not working");
        //check if Email Exist

        const existingEmail= await user.findOne({email :email});
        if(existingEmail){
            return res.status(400).json({message:"email already exist"});
        }

        //check passwords Length

        if(password.length<5){
            return res.status(400).json({message:"password must be more than 5 characters"});
        }
        const saltRounds = 10; // Number of salt rounds (adjust as needed)
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Now create User as he Follows All the condition

        const newUser= new user({
            username:username,
            password:hashedPassword,
            email:email,
            address:address
        });
        //console.log("working toll ");
        await newUser.save();
        res.status(200).json({message:"User Created Successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal Server Error"});
    }
});
//sign in
router.post("/sign-in", async (req,res)=>{
    try {
        const {username,password}=req.body;
        console.log("working toll ");
        //check if username exist
        const user1= await user.findOne({username:username});
        if(!user1){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //check if password is correct
        bcrypt.compare(password,user1.password,(err,data)=>{
            if(data){
                const authClaims=[{name:user1.username},{role:user1.role}];
                const token=jwt.sign({authClaims},"bookstore123",{expiresIn:"20d"});
                res.status(200).json([{message:"SIgn In SUcessful:"},{id:user1._id,role:user1.role,token:token}]);
            }
            else{
                res.status(400).json({message:"Invalid Credentials"});
            }
        });

    }
        catch (error) {
            console.log(error);
            res.status(500).json({message:"internal Server Error"});
        }
});
//user information
router.get("/get-user-information",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        //console.log(id);
        const data=await user.findById(id).select('-password');
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"internal Server Error"});
    }
});
//update
router.put("/update-address",authenticateToken,async (req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body;
        await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"data Updated Sucessfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal Server Error"});
            }

});
module.exports = router;