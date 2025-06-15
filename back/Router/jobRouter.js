const express = require('express');
const router = express.Router();
const jobController= require('../Controller/jobController');
const{protectRoute}=require("../Controller/authController");

// Create a new job listing
router.get('/get', jobController.getAllJobs);


// Get all job listingsy




// Get job listings by type (full-time or part-time)
router.get('/type', jobController.getJobByType);

// Get a job listing by ID
router.get('/get/:id', jobController.getJobById);
router.use(protectRoute);
router.post('/post', jobController.createJob);
router.get('/getadminjobs',jobController.getAdminJobs);

// Update a job listing by ID
router.put('/:id', jobController.updateJob);

// Delete a job listing by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;
