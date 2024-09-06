const jwt=require("jsonwebtoken");

const {JWT_KEY}=require("../secrets");

function protectRoute(req,res,next)
{
    if(req.cookies.login)
    {
        console.log(req.ookies);
        let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified)
        {
            next();
        }
        else{
            res.json({
                message:"user not allowed",
            })
        }
    }
    
    else{
        return res.json({
            message:"operation not allowed",
        })
    }
}

module.exports=protectRoute;