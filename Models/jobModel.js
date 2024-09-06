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
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,  // Alternatively, use an object with city, state, country
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],  // Array of strings
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true
  },
  salary: {
    type: String  // Could also be Number for specific values
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  applicationDeadline: {
    type: Date
  },
  contactInfo: {
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  applicationLink: {
    type: String
  },
  jobId: {
    type: String,
    unique: true
  }
});


module.exports = mongoose.model('Job', jobSchema);
