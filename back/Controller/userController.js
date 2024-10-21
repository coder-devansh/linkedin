const express = require("express");
const userModel = require("../Models/userModel");
const getDataUri = require("../utils/utils/datauri");
const cloudinary  = require("../utils/utils/cloudinary");

module.exports.getUser = async function getUser(req, res) {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if (user) {
            res.json({
                message: "User found",
                data: user,
            });
        } else {
            res.status(404).json({
                message: "User not found",
                error: true,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.updateUser = async function updateUser(req, res) {
    try {
        const { name, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "User deleted successfully",
                data: user,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        const users = await userModel.find();
        res.json({
            message: 'Users retrieved',
            data: users,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
