// import patient schema
const Patient = require('../../../models/patient');

// import report schema
const Report = require('../../../models/report');

// controller to create a report for a patient and save it to the database
module.exports.create = async function(req, res){
    try{
        // find the patient
        const patient = await Patient.findById(req.params.id);
        if(patient){
            // create a report for the patient and save it to the database
            const report = await Report.create({
                ...req.body,
                createdBy: req.user._id,
                date: Date.now(),
                patient: patient._id
            });
            // add the report to the patient's reports array
            patient.reports.push(report._id);
            patient.save();
            return res.status(200).json({
                message: "Report created successfully",
                report: report
            });
        }else{
            return res.status(404).json({
                message: "Patient not found"
            });
        }
    }catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}