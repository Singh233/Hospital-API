// Doctor schema and model
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Doctor = mongoose.model('Doctors', DoctorSchema);

module.exports = Doctor;
