// import express router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

// route for doctors 
router.use('/doctors', require('./doctors'));

module.exports = router;