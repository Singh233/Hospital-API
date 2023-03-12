const mongoose = require('mongoose');

// Patient schema and model
const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reports'
    }],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    }
}, { timestamps: true });

const Patient = mongoose.model('Patients', PatientSchema);

module.exports = Patient;