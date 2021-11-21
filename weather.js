const weatherpannel = document.getElementById("Weather");
const weatherstatepannel = weatherpannel.querySelector("#weather-item");
const weatherstateicon = weatherstatepannel.querySelector("#weather-state-icon");
const weathererrorpannel = weatherpannel.querySelector("#weather-error");
const GEOLOC ="geolocation";
const WEATHER ="weather";

function paintWeather(weatherObj)
{
    const temperaturemessage = weatherstatepannel.querySelector('#weather-temperature');
    const regionmessage = weatherstatepannel.querySelector("#weather-region");
    temperaturemessage.innerText = weatherObj.temperature;
    regionmessage.innerText = weatherObj.region;
    weatherstateicon.src = `http://openweathermap.org/img/wn/${weatherObj.icon}.png`;
    weathererrorpannel.style.display="none";
    weatherstatepannel.style.display="block";
}
function paintError()
{
    weathererrorpannel.style.display="block";
}
function saveWeather(json)
{
    const weathericon = json.weather[0].icon;
    const temperature = json.main.temp;
    const region = json.name;
    const weatherInfo={
        icon : ""+weathericon,
        temperature : ""+temperature+"°C",
        region : ""+region
    };
    //json 데이터로 weather에 저장하기 
    localStorage.setItem(WEATHER, JSON.stringify(weatherInfo));
    return weatherInfo;
}
function saveGeoLoc(pos){
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const geoinfo={
        lat : ""+lat,
        lon : ""+lon
    };
    localStorage.setItem(GEOLOC, JSON.stringify(geoinfo));
    return (geoinfo);
}
function getWeather(pos)
{
    //에러 발생시에 handle. 
    let geoInfo;
    const info = JSON.parse(localStorage.getItem(GEOLOC));
    console.log(`getWeather : pos is ${pos}`);
    console.log(`getWeather : info is ${info}`);
    if(info!==null){
        geoInfo = info;
        console.log(`getWeather : geoInfo = ${geoInfo}`);
    }
    else
    {
        geoInfo = saveGeoLoc(pos);
        console.log(`getWeather : info is not conveyed. geoInfo = ${geoInfo}`);    
    }
   fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${APIKEY}&units=metric`
    ).then(function(response){ //network 정보 => json으로 변경   
        return (response.json());
    }).then(function(json){
        paintWeather(saveWeather(json));
    })
}
function getGeolocation()
{
    navigator.geolocation.getCurrentPosition(getWeather,paintError);
}
function retrial()
{
    localStorage.setItem(WEATHER,null);
    localStorage.setItem(GEOLOC,null);
    getGeolocation();
}
function loadGeolocation()
{
    return (JSON.parse(localStorage.getItem(GEOLOC)));
}
function loadWeather()
{
    const weather = JSON.parse(localStorage.getItem(WEATHER));
    if(weather!= null)
    {
        //checkWeather();  
        console.log("Load weather Data in localstorage");
        paintWeather(weather);
    }
    else
    {
        const loc = loadGeolocation();
        if (loc !== null)
        {
            console.log(`Load Geo Data in localstorage, loc=${loc}`);
            getWeather(null);
        }
        else
        {
            console.log("No Data in LocalStorage");
            getGeolocation();
        }
    }
}
loadWeather();