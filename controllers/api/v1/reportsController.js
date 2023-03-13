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

// controller to show all reports of a patient from oldest to newest
module.exports.showAll = async function(req, res){
    try{
        console.log(req.params.id)
        // find the patient
        const patient = await Patient.findById(req.params.id);
        if(patient){
            // populate the patient with all reports
            await patient.populate('reports');
            
            // check if there are any reports
            if(patient.reports.length == 0){
                return res.status(404).json({
                    message: "No reports found"
                });
            }

            // else return all reports
            return res.status(200).json({
                message: "All reports of the patient",
                data: patient
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


// controller to show all reports of all patients filtered by specific status
module.exports.showAllByStatus = async function(req, res){
    try{
        // find all reports
        const reports = await Report.find({status: req.params.status}).sort('date').populate('patient');
        // check if there are any reports
        if(reports.length == 0){
            return res.status(404).json({
                message: "No reports found"
            });
        }
        // filter all reports by status
        const filteredReports = reports.filter(report => report.status == req.params.status);

        return res.status(200).json({
            message: "All reports of all patients",
            data: filteredReports
        });
    }catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}