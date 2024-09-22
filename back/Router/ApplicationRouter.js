const express=require("express");


const {protectRoute}=require("../Controller/authController");
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../Controller/applicationController");


const router=express.Router();

router.use(protectRoute)

router.route("/apply/:id")
.get(applyJob)

router.route("/get")
.get(getAppliedJobs)

router.route("/:id/applicants")
.get(getApplicants)

router.route("/status/:id/update").post(updateStatus);


module.exports=router;