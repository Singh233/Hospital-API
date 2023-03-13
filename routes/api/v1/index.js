// import express router
const express = require('express');
const passport = require('passport');
const router = express.Router();

// import report controller
const reportController = require('../../../controllers/api/v1/reportsController');

router.get('/', (req, res) => {
    res.send('Hello World');
});

// route for doctors 
router.use('/doctors', require('./doctors'));

// route for patients
router.use('/patients', require('./patientsAndReports'));


// route to show all reports of all patients filtered by specific status
router.get('/reports/:status', passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/v1/patients/auth-failed'
}), reportController.showAllByStatus);

module.exports = router;