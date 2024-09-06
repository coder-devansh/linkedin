const express=require("express");
const userModel=require("../Models/userModel");

module.exports.getUser=async function getUser(req,res)
{
    const id=req.params.id;
    const user=userModel.findById(id);
    if(user)
    {
        res.json({
            message:"user found",
            data:user,
        });
    }
    else{
        res.json({
            massage:"user not found",
            error:true,
        })
    }
}
    module.exports.updateUser = async function updateUser(req, res) {

        console.log("req.body-> ", req.body);
        //update data in users obj
        try {
          let id = req.params.id;
          console.log(id);
          let user = await userModel.findById(id);
          console.log(user);
          let dataToBeUpdated = req.body;
          if (user) {
            console.log('inside user');
            const keys = [];
            for (let key in dataToBeUpdated) {
              console.log(key);
              keys.push(key);
            }
      
            for (let i = 0; i < keys.length; i++) {
              console.log(keys[i]);
              user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            console.log(user);
            user.confirmPassword=user.password;
            const updatedData = await user.save();
            console.log(updatedData);
            res.json({
              message: "data updated successfully",
              data: updatedData,
            });
          } else {
            res.json({
              message: "user not found",
            });
          }
        } catch (err) {
          res.json({
            message: err.message,
          });
        }
      };
      module.exports.deleteUser=async function getuser(req,res)
      {
        try{
        const id=req.params.id;
        const user=userModel.findByIdAndDelete(id);
        res.json({
            message:"user deleted successfully",
            data:user,
        });
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
};
module.exports.getAllUser = async function getAllUser(req, res) {
    try{
    let users=await userModel.find();
    if(users){
      res.json({
        message:'users retrieved',
        data:users
      });
    }
  }
  catch(err){
    res.json({message:err.message})
  }
  };
