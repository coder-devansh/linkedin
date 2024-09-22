const express = require("express");
const userRouter = express.Router();
const multer = require('multer');
const {
    getUser,
    getAllUser,
    updateUser,
    deleteUser
} = require('../Controller/userController');
const {
    registerUser,
    login,
    isAuthorised,
    protectRoute,
    forgetPassword,
    resetPassword,
    logout
} = require('../Controller/authController');
const  singleUpload  = require("./multer");

// Multer configuration for file upload
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`);
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an Image! Please upload an image"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});

// User Routes
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route('/register')
    .post(singleUpload,registerUser);

userRouter.route('/login')
    .post(login);

userRouter.route('/logout')
    .get(logout);

userRouter.route('/forgetpassword')
    .post(forgetPassword);

userRouter.route('/resetpassword/:token')
    .post(resetPassword);

// Protected Routes
userRouter.use(protectRoute);

userRouter.route('/userProfile')
    .get(getUser);

// Admin-specific functions
userRouter.use(isAuthorised(['recruiter', 'student']));

userRouter.route('/')
    .get(getAllUser);

// Uncomment this if you want to enable profile image upload
// userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);

// Uncomment to enable a GET request for profile image HTML
// userRouter.get('/ProfileImage', (req, res) => {
//     res.sendFile("C:/Users/hp/OneDrive/Desktop/backened/multer.html");
// });

module.exports = userRouter;
