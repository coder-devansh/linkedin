const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose=require('mongoose');
const db_link="mongodb+srv://devanshbansal25072004:devansh123@backened.mgk9t.mongodb.net/?retryWrites=true&w=majority&appName=Backened";




mongoose.connect(db_link)

.then(() => {
  console.log('Jobmodel connected');
})
.catch(err => {
  console.error('MongoDB connection error in job:', err);
});
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
requirements: [{
    type: String
}],
salary: {
    type: Number,
    required: true
},
experienceLevel:{
    type:Number,
    required:true,
},
location: {
    type: String,
    required: true
},
jobType: {
    type: String,
    required: true
},
position: {
    type: Number,
    required: true
},
company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
},
created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
applications: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
]

    
},{timestamps:true});


module.exports = mongoose.model('job', jobSchema);
