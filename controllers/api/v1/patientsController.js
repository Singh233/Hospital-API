// import Patient scheme
const Patient = require('../../../models/patient');
// import passport
const passport = require('passport');

// controller to register a patient
module.exports.create = async function(req, res){
    try{

        // check if patient already exists
        const checkPatient = await Patient.findOne({number: req.body.number});
        if(checkPatient){
            return res.status(409).json({
                message: "Patient already exists",
                patient: checkPatient
            });
        }

        // else create a patient and save it to the database
        const patient = await Patient.create({...req.body, doctor: req.user._id});
        return res.status(200).json({
            message: "Patient registered successfully",
            patient: patient
        });
    }catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// controller to handle auth failed
module.exports.authFailed = function(req, res){
    return res.status(401).json({
        message: "Authentication failed"
    });
}