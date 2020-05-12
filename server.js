projectData={};
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors=require('cors');
app.use(cors());
app.use(express.static('website'));
const port = 8080;
const server = app.listen(port,listening);

function listening(){
    console.log('server running at port'+ port)
}
/*app routes GETAdd a GET route that returns the projectData object in your server code 
Then, add a POST route that adds incoming data to projectData.
The POST route should anticipate receiving three pieces of data from the request body
temperature
date
user response
There should be a GET route setup on the server side with the first argument 
as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.*/
app.get('http://localhost:8080/all', retProjData);
function retProjData(req,res){
    res.send(projectData);
}
// POST route
const dataFromUser = [];
app.post('http://localhost:8080/add', addProjData);

function addProjData(req,res){
    console.log(req.body);
    dataFromUser={temperature:req.body.temperature, date:req.body.date, userRes:req.body.userRes}
    
    projectData={...dataFromUser};

}