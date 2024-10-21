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
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'job',
    required:true
},
applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
},
status:{
    type:String,
    enum:['pending', 'accepted', 'rejected'],
    default:'pending'
}
},{timestamps:true});


module.exports = mongoose.model('Application', applicationSchema);


