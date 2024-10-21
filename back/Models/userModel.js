const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose=require('mongoose');
const db_link="mongodb+srv://devanshbansal25072004:devansh123@backened.mgk9t.mongodb.net/?retryWrites=true&w=majority&appName=Backened";




mongoose.connect(db_link)

.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});




// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [emailValidator.validate, 'Invalid email format']
  },
  phoneNumber:{
    type:String,
    required:true,
  
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        return value == this.password;
      },
      message: 'Passwords do not match'
    }
  },
  role: {
    type: String,
    enum: ['recruiter', 'student',],
    default: 'student'
  },
  profile: {
   
    bio:{
      type:String,
    },
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
    profilePhoto:{
      type:String,
      default:"",
    },
   
  },

  Qualification:{
    type:String,
  },
  
 
  resetToken: String
},{timestamps:true});
const userModel=mongoose.model("user",userSchema);

module.exports=userModel;