
const apikey ="226610fc0fcb18189acda35854407acd";
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkweather(city){
	const response = await fetch(apiurl + city + `&appid=${apikey}` );

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  else{

    var data = await response.json();

// console.log(data);

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

if(data.weather[0].main =="Clouds"){
  weatherIcon.src = "images/clouds.png";
}
else if(data.weather[0].main == "Clear"){
  weatherIcon.src = "images/clear.png";
}
else if(data.weather[0].main == "Rain"){
  weatherIcon.src = "images/rain.png";
}
else if(data.weather[0].main == "Drizzle"){
  weatherIcon.src = "images/drizzle.png";
}
else if(data.weather[0].main == "Mist"){
  weatherIcon.src = "images/mist.png";
}

document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";


function updateDateTime() {
  var dateTimeElement = document.getElementById("date-time");
  var currentDate = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[currentDate.getDay()];
  var date = currentDate.toLocaleDateString();
  var time = currentDate.toLocaleTimeString();

  var dateTimeString = " " + day + ", " + date + ", " + time;
  dateTimeElement.textContent = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

  }

}


searchBtn.addEventListener("click", ()=>{
  checkweather(searchBox.value);
})

//-----------------------------------------------------------------------------------------------------------------------------


function GetInfo() {

  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=e7a4b9b6eeb5d99120466e8f64f6c852&units=metric')
.then(response => response.json())
.then(data => {

  // the values for each day
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp - "").toFixed(1)+ "°C";
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Humidity").innerHTML = "Humiddity: " + Number(data.list[i].main.humidity - "").toFixed(2)+ "%";
  }
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Windspeed").innerHTML = "Windspeed: " + Number(data.list[i].wind.speed - "").toFixed(3)+ "km/h";
  }

  // Weather Icons
   for(i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.list[i].weather[0].icon
      +".png";
  }
  
  
  console.log(data)

})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
  document.getElementById("cityInput").defaultValue = "Delhi";
  GetInfo();
}

//the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }