const cors= require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/* listening port*/
const port =8000;

// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));




/* Require Express to run server and routes*/

// to get the data http://localhost:8000/get 
app.get('/get',(request,response) =>{
    response.status(200).send(projectData);
});


// to post the data http://localhost:8000/post*/
app.post('/post',(request,response)=>{
    projectData=request.body;
    console.log(projectData);
    response.status(200).send(projectData);
});






// Setup Server 
app.listen(port,() =>{
    console.log(`server running on: http://localhost:${port}`);
});