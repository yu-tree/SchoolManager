const APIKEY = "0a017485e08b21689342105d70775a4f";
const weatherpannel = document.getElementById("Weather");
const weatherstatepannel = weatherpannel.querySelector("#weather-item");
const weatherstateicon = weatherstatepannel.querySelector("#weather-state-icon");
const weathererrorpannel = weatherpannel.querySelector("#weather-error");
const weathererroricon = weathererrorpannel.querySelector("#retry-icon");
const GEOLOC ="geolocation";
const WEATHER ="weather";

function paintWeather(weather)
{
    const weathericon = weather.weather[0].icon;
    const temperaturemessage = weatherstatepannel.querySelector('#weather-temperature');
    const regionmessage = weatherstatepannel.querySelector("#weather-region");
    temperaturemessage.innerText = weather.main.temp;
    regionmessage.innerText = weather.name;
    weatherstateicon.src = `http://openweathermap.org/img/wn/${weathericon}.png`;
    weathererrorpannel.style.display="none";
    weatherstatepannel.style.display="block";
}
function paintRetryMessage()
{
    weathererrorpannel.style.display="block";
}
function handleGeoError()
{
    paintRetryMessage();
}
function handleGeoSuccess(pos)
{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
    ).then(function(response){ //network 정보 => json으로 변경
      return response.json();
    }).then(function(json){
        paintWeather(json);
        localStorage.setItem(WEATHER, json);
    })
}
function getGeolocation()
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadGeolocation()
{
    const loc = localStorage.getItem(GEOLOC);
    const weather = localStorage.getItem(WEATHER);
    if(loc !==null && weather !==null)
        paintWeather(weather);
    else
        getGeolocation();
}
loadGeolocation();