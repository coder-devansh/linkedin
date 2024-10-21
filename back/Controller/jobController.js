const express = require("express");
const jobModel = require("../Models/jobModel");

module.exports.createJob = async function createJob(req, res) {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await jobModel.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.getAllJobs = async function getAllJob(req, res) {
    try {
        const keyword=req.query.keyword ||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {descriptions:{$regex:keyword,$options:"i"}}
            ]
        };
        const jobs = await jobModel.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if (jobs) {
            return res.status(200).json({
                
                jobs,
                success:true,
            });
        } else {
            return res.status(404).json({
                message: "No jobs are available",
            });
        }
    } catch (err) {
       console.log(err);
    }
};

module.exports.getJobById = async function getJobById(req, res) {
    try {
        let id = req.params.id;
        const job = await jobModel.findById(id).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job does not exist",
            });
        }
        return res.status(200).json({
            message: "Job retrieved successfully",
            job,
            success:true
        });
    } catch (err) {
       console.log(err);
    }
};

module.exports.getAdminJobs=async function getAdminJobs(req,res){
    try{
        const adminId=req.id;
        const jobs=await jobModel.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(201).json({
            message:"job found",
            jobs,
            success:true,
        })
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.updateJob = async function updateJob(req, res) {
    try {
        const id = req.params.id;
        let dataToBeUpdated = req.body;
        let job = await jobModel.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }
        for (let key in dataToBeUpdated) {
            job[key] = dataToBeUpdated[key];
        }
        await job.save();
        return res.status(200).json({
            message: "Job updated successfully",
            data: job
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

module.exports.deleteJob = async function deleteJob(req, res) {
    try {
        const id = req.params.id;
        let job = await jobModel.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        return res.status(200).json({
            message: "Data deleted successfully",
            data: job
        });
    } catch (err) {
        return res.json({
            message: err.message
        });
    }
};

module.exports.getJobByType = async function getJobByType(req, res) {
    try {
        const { jobType } = req.query;  // Extract job type from query parameters
        if (!['full-time', 'part-time'].includes(jobType)) {
            return res.status(400).json({ error: 'Invalid job type' });
        }

        const jobs = await jobModel.find({ jobType });  // Query jobs by type
        return res.status(200).json({
            message: "Jobs retrieved successfully",
            data: jobs
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}; 

module.exports.sortBySalary = async function sortBySalary(req, res) {
    try {
        const jobs = await jobModel.find().sort({ salary: -1 }).limit(5);
        return res.status(200).json({
            message: 'Jobs ordered by salary',
            data: jobs
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};
