const Doctor = require('../../../models/doctor'); // import doctor model

// variables for jwt token
const jwt = require('jsonwebtoken');
const SECRETKEY = 'hospital-api';

// import passport
const passport = require('passport');

// controller to register a doctor
module.exports.create = async function(req, res){
    console.log(req.body);
    try{
        const doctor = await Doctor.create({...req.body, email: req.body.email.toLowerCase()});
        return res.status(200).json({
            message: "Doctor registered successfully",
            doctor: doctor
        });
    }catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// controller to login a doctor
module.exports.createSession = async function(req, res){
    // find the doctor
    try{
        const doctor = await Doctor.findOne(req.body);
        // if doctor not found
        if (!doctor){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }
        // define pay load data
        const payload = {
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            exp: Math.floor(Date.now() / 1000) + (60) // Token expiration time

        }
        // generate JWT token
        const token = jwt.sign(payload, SECRETKEY);

        // send the token to the client
        return res.status(200).json({
            message: "Sign in successful, here is your token, please keep it safe!",
            data: {
                token
            }
        });
    }catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


