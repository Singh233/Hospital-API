// import express
const express = require('express');
const port = process.env.PORT || 3000;



// create an instance of express app
const app = express();

// use routes
app.use('/api/v1', require('./routes/api/v1/index'));

// start the server
app.listen(port, (error) => {
    if (error) return console.log('Error in running express server: ', error);
    console.log(`Server running at http://localhost:${port}/`);
});