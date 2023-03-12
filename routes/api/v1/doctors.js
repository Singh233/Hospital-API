// import express
const express = require('express');
// import express router
const router = express.Router();
// import doctor controller
const doctorController = require('../../../controllers/api/v1/doctorsController');

// route to register a doctor
router.post('/register', doctorController.create);

// route to login a doctor
router.post('/login', doctorController.createSession);

module.exports = router;