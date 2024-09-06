const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a new job listing
router.post('/', jobController.createJob);

// Get all job listings
router.get('/', jobController.getAllJobs);

// Get job listings by type (full-time or part-time)
router.get('/type', jobController.getJobsByType);

// Get a job listing by ID
router.get('/:id', jobController.getJobById);

// Update a job listing by ID
router.put('/:id', jobController.updateJob);

// Delete a job listing by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;
