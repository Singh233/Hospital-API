const mongoose = require('mongoose');

// Report schema and model
const ReportSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients'
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Export the model
const Report = mongoose.model('Reports', ReportSchema);

module.exports = Report;
