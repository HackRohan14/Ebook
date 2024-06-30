const jwt=require("jsonwebtoken");

const authenticateToken =(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token,"bookstore123",(err,user)=>{
        if(err){
            return res.status(400).json({message:"Invalid Token Expired"});
        }
        else{
            req.user=user;
            next();
        }
    });
};
module.exports=authenticateToken;