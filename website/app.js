/* Global Variables */
const URL="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ',&appid=67600ccea63b367c9bc294c88787d0b6&units=imperial';
const server="http://127.0.0.1:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//main function that works when clicking the button and retrieve the weather data
const generateData= () =>{
    const zip=document.getElementById("zip").value;
    const feelings=document.getElementById("feelings").value;
    getResult(zip).then((data) =>{
        if(data){
            const{
                main:{temp},
                name:city,
                weather:[ { description } ],
            } =data;
            const result ={
                newDate,
                city,
                temp:Math.round(temp),
                description,
                feelings,

            };
            postData(server+"/post",result);
            updateUI();
            


        }
    });
};


//calling the function generateData when clicking on the generate button
document.getElementById("generate").addEventListener("click",generateData);


//function to get back weather data from api using zip code
const getResult= async (zip)=>{
    try{
    const response= await fetch(URL + zip + apiKey);
    const result=await response.json(); 
    
    if(result.cod !=200){
        throw`${result.message}`;
    }
    return result;
    }
    catch(error){
        console.log(error);

    }
};


//function to post data
const postData= async (url="", res={}) =>{
    const response= await fetch(url,{
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(res),
    });
    try{
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        }
};


//updating the UI with the weather result
const updateUI= async ()=>{
    const response = await fetch( server + "/get");
    try{
        const data = await response.json();
        document.getElementById("date").innerHTML=data.newDate;
        document.getElementById("city").innerHTML=data.city;
        document.getElementById("temp").innerHTML=data.temp;
        document.getElementById("description").innerHTML=data.description;
        document.getElementById("content").innerHTML=data.feelings;

    }
    catch(error){
        console.log(error);
    }
};