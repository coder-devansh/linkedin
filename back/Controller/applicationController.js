const express=require("express");
const Application=require("../Models/applicationModel");
const Job=require("../Models/jobModel");
const User=require("../Models/jobModel");


module.exports.applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
        return res.status(400).json({
            message: "Job id is required.",
            success: false
        })
    };
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
        return res.status(400).json({
            message: "You have already applied for this jobs",
            success: false
        });
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({
            message: "Job not found",
            success: false
        })
    }
    // create a new application
    const newApplication = await Application.create({
        job:jobId,
        applicant:userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message:"Job applied successfully.",
        success:true
    })
} catch (err) {
      console.log(err);
    }
  };
  
  // Get all applications for a job
  module.exports.getAppliedJobs = async function getAppliedJobs (req, res) {
    try{
    const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
  }
  module.exports.getApplicants=async function getApplicants(req,res){
    try{
      let jobId=req.params.id;
      const job=await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
          path:'applicant',

        }
      });
      if(!job){
        return res.status(401).json({
          message:"Job not found",
          success:false
        })
      };

      return res.status(200).json({
        job,
        success:true
      });



    }
    catch(err){
      console.log(err);
    }
  };

  // Get a specific application by ID
 
    
  // Update an application status
  module.exports.updateStatus = async (req, res) => {
    try {
      const {status} = req.body;
      const applicationId = req.params.id;
      if(!status){
          return res.status(400).json({
              message:'status is required',
              success:false
          })
      };

      // find the application by applicantion id
      const application = await Application.findOne({_id:applicationId});
      if(!application){
          return res.status(404).json({
              message:"Application not found.",
              success:false
          })
      };

      // update the status
      application.status = status.toLowerCase();
      await application.save();

      return res.status(200).json({
          message:"Status updated successfully.",
          success:true
      });

  } catch (error) {
      console.log(error);
  }
  };
  
  // Delete an application
  module.exports.deleteApplication = async function deleteApplication(req, res)  {
    try {
      const { id } = req.params;
      const application = await Application.findByIdAndDelete(id);
      if (!application) return res.status(404).json({ error: 'Application not found' });
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };