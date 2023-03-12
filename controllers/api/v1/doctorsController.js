const Doctor = require('../../../models/doctor'); // import doctor model

// controller to register a doctor
module.exports.create = async function(req, res){
    console.log(req.body);
    try{
        const doctor = await Doctor.create(req.body);
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
