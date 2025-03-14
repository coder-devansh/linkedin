const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const getDataUri = require("../utils/utils/datauri");
const  cloudinary = require("../utils/utils/cloudinary");
dotenv.config();

module.exports.registerUser = async function registerUser(req, res) {
    try {
        const { name, email, phoneNumber, password, role } = req.body;
        if (!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
       
        
       
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            phoneNumber,
            password: hashPassword,
            confirmPassword: hashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.login = async function login(req, res) {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Define cookie options
        const cookieOptions = {
            httpOnly: true,  // JavaScript can't access the cookie
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Helps prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        };

        // Attach the token to a cookie and return the response
        return res
            .status(200)
            .cookie("login", token, cookieOptions)
            .json({
                message: `Welcome back ${user.name}`,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile
                },
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports.forgetPassword = async function forgetPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            const resetToken = user.createResetToken(); // Ensure this method is correctly defined
            const resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
            const obj = {
                resetPasswordLink,
                email
            };
            // Send reset email
            await sendMail("resetPassword", obj); // Ensure sendMail is defined and handles async
            return res.json({
                message: "Link has been sent",
                data: resetPasswordLink
            });
        } else {
            return res.status(404).json({
                message: "Please sign up"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        const user = await userModel.findOne({ resetToken: token }); // Ensure this query is valid
        if (user) {
            const { password, confirmPassword } = req.body; // Make sure these are sent in the request
            if (password !== confirmPassword) {
                return res.status(400).json({
                    message: "Passwords do not match"
                });
            }
            user.resetPasswordHandler(password, confirmPassword); // Ensure this method exists and is valid
            await user.save();
            return res.json({
                message: "Password reset successfully",
            });
        } else {
            return res.status(404).json({
                message: "User not found"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports.logout = async function logout(req, res) {
    try {
        res.clearCookie("login"); // Clear the login cookie
        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports.protectRoute = (req, res, next) => {
    const token = req.cookies.login; // or however you manage authentication
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId; // Assuming the user's ID is in payload
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports.isAuthorised = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Verify the token from the request cookies
            const token = req.cookies.login;
            if (!token) {
                return res.status(401).json({ message: "Not authorized, no token" });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await userModel.findById(decoded.userId).select('-password'); // Exclude password from response

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if user role is in the allowed roles
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "You do not have permission to access this resource" });
            }

            // User is authorized, proceed to the next middleware
            req.user = user; // Optionally attach user info to the request object
            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};
