const express=require("express");
const {getCompany,updateCompany,getCompanyById,registerCompany}=require("../Controller/CompanyContoller");
const {protectRoute}=require("../Controller/authController");
const singleUpload=require('./multer');

const router=express.Router();

router.use(protectRoute);
router.route('/register')
.post(registerCompany)

router.route("/get")
.get(getCompany)

router.route("/get/:id")
.get(getCompanyById)

router.route("/update/:id")
.put(singleUpload,updateCompany);

module.exports=router;