// import express
const express = require('express');
const passport = require('passport');
// import express router
const router = express.Router();
// import patient controller
const patientController = require('../../../controllers/api/v1/patientsController');
// import report controller
const reportController = require('../../../controllers/api/v1/reportsController');

// route to register a patient
router.post('/register', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/v1/patients/auth-failed'
}), patientController.create);

// route to auth failed
router.get('/auth-failed', patientController.authFailed);

// route to create a report for a patient
router.post('/:id/create_report', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/v1/patients/auth-failed'
}), reportController.create);

module.exports = router;