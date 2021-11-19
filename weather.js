import APIKEY from "./properties";
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
function handleGeoError()
{
    weathererrorpannel.style.display="block";
}
function saveGeoLoc(json){
    const lat = json.coords.latitude;
    const lon = json.coords.longitude;
    const geoinfo={
        lat : lat,
        lon : lon
    };
    localStorage.setItem(GEOLOC, JSON.stringify(geoinfo));
    return (getinfo);
}
function handleGeoSuccess(pos,info)
{
    let geoInfo;
    if(info!==null)
        geoInfo = info;
    else
        geoInfo = saveGeoLoc(pos);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${APIKEY}&units=metric`
    ).then(function(response){ //network 정보 => json으로 변경
      return response.json();
    }).then(function(json){
        paintWeather(json);
    })
}
function getGeolocation()
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadGeolocation()
{
    const loc = JSON.parse(localStorage.getItem(GEOLOC));
    const weather = localStorage.getItem(WEATHER);
    if(weather !==null)
        paintWeather(weather);
    else{
        if (loc!=null){
            handleGeoSuccess(0, loc);
        }else{
            getGeolocation();
        }
    }
}
loadGeolocation();