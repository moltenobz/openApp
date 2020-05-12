
//API credentials
const apiKey = '&appid=54098b3ba8400ec4fb647b8807184f5c';

const owUrl ='http://api.openweathermap.org/data/2.5/weather?zip=';
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
var push;

window.onload= init;
function init() {
    push =document.querySelector('#generate');
    push.addEventListener('click',callme);
    
}
//function called by the button

function callme(evt){
    console.log('good');
    const newWeatherZip = document.querySelector('#zip').value;
    const newWeatherFeelings = document.querySelector('#feelings').value;
    console.log(newWeatherZip,newWeatherFeelings);
    getWeatherData(owUrl,newWeatherZip,apiKey).then(function(weathData){
        var prova = {temperature:weathData.main.temp,date:newDate,userRes:newWeatherFeelings};
   console.log(prova)
        postData('http://localhost:8080/add',prova);
        
    }).then(updateUI())

    //we add the chained functions here
   /*var prova = {temperature:weathData.main.temp,date:newWeatherZip,userRes:newWeatherFeelings};
   console.log(prova);*/
    //postData('/add',prova);
   
}

//function that retireve data from the API
const getWeatherData =async (owUrl,newWeatherZip,apiKey) =>{
    const res = await fetch(owUrl+newWeatherZip+apiKey)
    try
    {
    const weathData = await res.json()
    console.log(weathData);
    console.log(weathData.main.temp);
    
        return weathData;
    }
    catch (error)
    {
        console.log("error",error);
    }
}
//After your successful retrieval of the weather data, you will need to 
//chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.

const postData = async (url='',data={}) =>{

    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try
    {const newData = await res.json()
    console.log(data)
    return newData;}
    catch (error){
        console.log("error",error);
    }

}

//then we declare a function that updates the UI.I order to do so, we must include a GET request that retrieves all the data we posted

const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try{
      const allData = await request.json();
      document.querySelector('#date').innerHTML =allData[0].date;
      document.querySelector('#temp').innerHTML =allData[0].temperature
      document.querySelector('#content').innerHTML =allData[0].userRes;
     
  
    }catch(error){
      console.log("error", error);
    }
  }