const express=require("express");
const jobModel=require("../Models/jobModel");


module.exports.createJob=async function createJob(req,res){
    try{
    const job=req.body;
    let createJob=await jobModel.create(job);
    return res.status(201).json({
        message:"job created successfully",
        data:createJob
    });
}
catch(err){
    return res.json({
        message:err.message
    })
}


}
module.exports.getAllJob=async function getAllJob(req,res)
{
    try{
    const job=jobModel.find();
    if(job){
    return res.status(201).json({
        message:"Job fetch out successfully",
        data:job
    });
}
else{
    return res.json({
        message:"jobs are not available",

    })
}
    }
    catch(err){
        return res.json({
            messahe:err.message
        });
    }


}
module.exports.getJobById=async function getJobById(req,res){
    try{
    let id=req.params.id;
    const job=jobModel.findById(id);
    if(job){
        return res.status(200).json({
            message:"job is retrieved successfully",
            data:job,
        });
    }
    else{
        return res.status(400).json(
            {
                message:"job does not exist",
            }
        )
    }
}
catch(err){
    return res.json({
        message:err.message

    });
}
};
module.exports.updateJob=async function updateJob(req,res){
    try{
    const id=req.params.id;
    let datatobeupdated=req.body;
    let  keys=[];
    for(let key in datatobeupdated){
        keys.push(key);

    }
    let job=await jobModel.findById(id);
    for(let key in keys){
        job[key]=datatobeupdated[key];
    }
    await job.save();
    return res.status(200).json({
        message:"job updated successfully",
        data:job
    });
}
catch(err){
    return res.status(400).json({
        message:err.message,
    })
}
};
module.exports.deleteJob=async function deleteJob(req,res){
    try{
    const id=req.params.id;
    let job=jobModel.findByIdAndDelete(id);
    if(job){
    await job.save();
    return res.status(200).json({
        message:"data deleted successfully",
        data:job
    });
}
else{
    return res.status(400).json({
        message:"job not found"
    })
}
    }
    catch(err){
        return res.json({
            message:err.message
        });
    }
    
};
module.exports.getJobByType=async function getJobByType(req,res){
 
    try {
        const { jobType } = req.query;  // Extract job type from query parameters
        if (!['full-time', 'part-time'].includes(jobType)) {
          return res.status(400).json({ error: 'Invalid job type' });
        }
        
        const jobs = await jobModel.find({ jobType });  // Query jobs by type
        res.status(200).json(jobs);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };

module.exports.sortBySalary=async function sortBySalary(req,res){
    try{
        const jobs=await jobModel.find().sort({
            salary:-1
        }).limit(5);
        return res.json({
            message:'order by salary',
            data:jobs
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
          });
    }
}


