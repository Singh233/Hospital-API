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
        // check if doctor already exists
        const checkDoctor = await Doctor.findOne({email: req.body.email.toLowerCase()});
        if(checkDoctor){
            return res.status(409).json({
                message: "Doctor already exists",
            });
        }

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
        const doctor = await Doctor.findOne({...req.body, email: req.body.email.toLowerCase()});
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

        }
        // generate JWT token
        const token = jwt.sign(payload, SECRETKEY, {expiresIn: 1000000}); // 1000000 seconds = 11 days

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


