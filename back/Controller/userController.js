const express = require("express");
const userModel = require("../Models/userModel");

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
    console.log("req.body-> ", req.body);
    try {
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findById(id);
        if (user) {
            console.log('Inside user');
            Object.keys(req.body).forEach(key => {
                if (key !== 'confirmPassword') {
                    user[key] = req.body[key];
                }
            });
            user.confirmPassword = user.password; // Make sure this is intended
            const updatedData = await user.save();
            res.json({
                message: "Data updated successfully",
                data: updatedData,
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
