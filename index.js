// import express
const express = require('express');
const passport = require('./config/passport-jwt-strategy');
const port = process.env.PORT || 3000;




const db = require('./config/mongoose');



// create an instance of express app
const app = express();

//urlencoded to decode the data send by forms
app.use(express.urlencoded());

// use passport
app.use(passport.initialize());



// json to decode the data send in form of json
app.use(express.json());

// use routes
app.use('/api/v1', require('./routes/api/v1/index'));

// start the server
app.listen(port, (error) => {
    if (error) return console.log('Error in running express server: ', error);
    console.log(`Server running at http://localhost:${port}/`);
});