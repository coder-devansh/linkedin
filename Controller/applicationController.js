const express=require("express");
const Application=require("../Models/applicationModel");
const Job=require("../Models/jobModel");
const User=require("../Models/jobModel");


module.exports.createApplication = async (req, res) => {
    try {
      const { jobId, applicantId, resume, coverLetter } = req.body;
      
      // Validate job and applicant
      const job = await Job.findById(jobId);
      const applicant = await User.findById(applicantId);
  
      if (!job) return res.status(404).json({ error: 'Job not found' });
      if (!applicant) return res.status(404).json({ error: 'Applicant not found' });
  
      // Create and save application
      const application = new Application({
        job: jobId,
        applicant: applicantId,
        resume,
        coverLetter
      });
  
      await application.save();
      res.status(201).json(application);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get all applications for a job
  module.exports.getApplicationsForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
      const applications = await Application.find({ job: jobId }).populate('applicant', 'name email');
      res.status(200).json(applications);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Get a specific application by ID
  module.exports.getApplicationById = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Application.findById(id).populate('applicant', 'name email').populate('job', 'title company');
      if (!application) return res.status(404).json({ error: 'Application not found' });
      res.status(200).json(application);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Update an application status
  module.exports.updateApplicationStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status
      if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
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