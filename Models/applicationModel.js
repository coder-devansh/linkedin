const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose=require('mongoose');
const db_link="mongodb+srv://devanshbansal25072004:devansh123@backened.mgk9t.mongodb.net/?retryWrites=true&w=majority&appName=Backened";
mongoose.connect(db_link)

.then(() => {
  console.log('applicationModel connected');
})
.catch(err => {
  console.error('MongoDB connection error in application:', err);
});
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  applicationId: {
    type: Schema.Types.ObjectId,
    auto: true, // Auto-generate an ObjectId
    unique: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  candidatePhone: {
    type: String
  },
  resume: {
    type: String, // URL or file path to the resume
    required: true
  },
  coverLetter: {
    type: String
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Interviewed', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  interviewDate: {
    type: Date
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Application', applicationSchema);
