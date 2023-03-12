// import mongoose

const mongoose = require('mongoose');
const uri = process.env.HOSPITAL_API_DB;
console.log(uri)
// connect to the database
mongoose.connect(uri);

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'connection error:'));

// up and running then print the message
db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports = db;
