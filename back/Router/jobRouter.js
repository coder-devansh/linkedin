const express = require('express');
const router = express.Router();
const jobController= require('../Controller/jobController');
const{protectRoute}=require("../Controller/authController");

// Create a new job listing
router.use(protectRoute);
router.post('/post', jobController.createJob);

// Get all job listingsy
router.get('/get', jobController.getAllJobs);

router.get('/getadminjobs',jobController.getAdminJobs);

// Get job listings by type (full-time or part-time)
router.get('/type', jobController.getJobByType);

// Get a job listing by ID
router.get('/get/:id', jobController.getJobById);

// Update a job listing by ID
router.put('/:id', jobController.updateJob);

// Delete a job listing by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;
