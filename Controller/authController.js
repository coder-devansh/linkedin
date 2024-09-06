const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

module.exports.signUp = async function signUp(req, res) {
    try {
        let dataObj = req.body;
        const user = await userModel.create(dataObj);
        Sendmail("signUp", user);
        if (user) {
            return res.json({
                message: "user signed up",
                data: user,
            });
        }
        else {
            res.json({
                message: "error while signing up",

            });

        }
    }
    catch (err) {
        return res.status(501).json({
            message: err.message,
            error: true,
        });
    }
}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            const user = userModel.findOne({ email: data.email });
            if (user) {
                if (data.password == user.password) {
                    let uid = user["_id"]; //uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie("login", token, { httpOnly: true });
                    return res.json({
                        message: "user login successfully",
                        data: user,
                    });

                }
                else {
                    return res.json({
                        message: "Password is incorrect",

                    })
                }
            }
            else {
                return res.json({
                    message: "user not found",

                });

            }
        }


    }
    catch(err){
        return res.json({
            message:err.message,

        })
    }
};

module.exports.forgetPassword=async function forgetPassword(req,res){
    try{
    const {email}=req.body;
    const user=userModel.findOne({email:email});
    if(user){
    const resetToken=user.createResetToken();
    let resetPasswordlink=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    let obj={
    resetPasswordlink:resetPasswordlink,
    email:email
    }
    sendMail("resetPassword",obj);
    return res.json({
        message:"link has sent ",
        data:resetPasswordlink
    });
}
else{
    return res.json({
        message:"plese sign up"
    })
}
    }
    catch(err)
    {
        return res.json({
            message:err.message
        });
    }
    
    
}
module.exports.resetPassword=async function resetPassword(req,res)
{
    try{
    const token=req.params.token;
    const user=userModel.findOne({token:token});
    if(user){
        user.resetPasswordHandler(password,confirmPassword);
        await user.save();
        return res.json({
            message:"password reset successfully",
            
        });
        
    }
    else{
        return res.json({
            message:"user not found"
        });
    }
}
catch(err){
    return res.json({
        message:err.message
    });
}
}