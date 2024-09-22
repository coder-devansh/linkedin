const express=require("express");
const Application=require("../Models/applicationModel");
const Job=require("../Models/jobModel");
const User=require("../Models/jobModel");


module.exports.applyJob = async (req, res) => {
    try {
      const applicantId=req.id;
      const jobId=req.params.id;

      
      
      // Validate job and applicant
      const job = await Job.findById(jobId);
      const applicant = await Application.findOne({job:jobId,applicant:applicantId});
  
      if (!job) return res.status(404).json({ error: 'Job not found' });
      if (applicant) return res.status(404).json({ message:'you have already applied for this job' });
  
      // Create and save application
      const application = new Application({
        jobId: jobId,
        applicant: applicantId,
       
      });
      job.applications.push(application._id);
  
      await application.save();
      res.status(201).json(application);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get all applications for a job
  module.exports.getAppliedJobs = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Application.findById(id).sort({createdAt:-1}).populate(
        {
          path:'job',
          options:{sort:{createdAt:-1}},
          populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
          }
        });
      if (!application) return res.status(404).json({ error: 'Application not found' });
      res.status(200).json(application);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
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
        jobs,
        success:true
      });



    }
    catch(err){
      return res.json({
        message:err.message
      });
    }
  };

  // Get a specific application by ID
 
    
  // Update an application status
  module.exports.updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status
      if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      const application = await Application.findByIdAndUpdate(id, { status}, { new: true });
      if (!application) return res.status(404).json({ error: 'Application not found' });
  
      res.status(200).json(application);
    } catch (err) {
      res.status(400).json({ error: err.message });
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