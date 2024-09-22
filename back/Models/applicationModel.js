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
    auto: true,
    ref:"User", // Auto-generate an ObjectId
    unique: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'job', // Reference to the Job model
    required: true
  },

  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Interviewed', 'Rejected', 'Hired'],
    default: 'Pending'
  },

},{timestamps:true});

module.exports = mongoose.model('Application', applicationSchema);


