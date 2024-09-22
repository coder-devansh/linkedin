
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const db_link = "mongodb+srv://devanshbansal25072004:devansh123@backened.mgk9t.mongodb.net/?retryWrites=true&w=majority&appName=Backened";


mongoose.connect(db_link)

    .then(() => {
        console.log('Jobmodel connected');
    })
    .catch(err => {
        console.error('MongoDB connection error in job:', err);
    });


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
       
    },
    website: {
        type: String,

    },
    location: {
        type: String,
        
    },
    logo: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
        
    }
}, { timestamps: true },)



const companyModel = mongoose.model('Company', CompanySchema);
module.exports = companyModel;
