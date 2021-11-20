const {clearHash}=require("../services/cash");

module.exports=async(req,res,next)=>{
    // after successfully created a blog
    await next();
    clearHash(req.user.id);
}