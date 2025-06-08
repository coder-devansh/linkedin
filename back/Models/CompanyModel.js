
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const db_link = "mongodb+srv://devanshbansal25072004:devansh123@backened.mgk9t.mongodb.net/?retryWrites=true&w=majority&appName=Backened";


mongoose.connect(db_link)

    .then(() => {
        console.log('Companymodel connected');
    })
    .catch(err => {
        console.error('MongoDB connection error in company:', err);
    });


    const companySchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String, 
        },
        website:{
            type:String 
        },
        location:{
            type:String 
        },
        logo:{
            type:String // URL to company logo
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        }
    },{timestamps:true})



const companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;
