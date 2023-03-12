// import express
const express = require('express');
const port = process.env.PORT || 3000;

// create an instance of express app
const app = express();

// create a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// start the server
app.listen(port, (error) => {
    if (error) return console.log('Error in running express server: ', error);
    console.log(`Server running at http://localhost:${port}/`);
});