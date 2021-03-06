const APIKEY = "0a017485e08b21689342105d70775a4f";
const GEOLOC ="geolocation";
const WEATHER ="weather";

function paintWeather(weatherObj,weatherstatepannel,weatherstateicon,weathererrorpannel)
{
    const temperaturemessage = weatherstatepannel.querySelector('#weather-temperature');
    const regionmessage = weatherstatepannel.querySelector("#weather-region");
    temperaturemessage.innerText = weatherObj.temperature;
    regionmessage.innerText = weatherObj.region;
    weatherstateicon.src = `http://openweathermap.org/img/wn/${weatherObj.icon}.png`;
    weathererrorpannel.style.display="none";
    weatherstatepannel.style.display="block";
}
function paintError(weathererrorpannel,weatherstatepannel)
{
    weathererrorpannel.style.display="block";
    weatherstatepannel.style.display="none";
}
function saveWeather(json)
{
    const weathericon = json.weather[0].icon;
    const temperature = json.main.temp;
    const region = json.name;
    const weatherInfo={
        icon : ""+weathericon,
        temperature : ""+temperature+"°C",
        region : ""+region+","
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
function getWeather(pos,weatherstatepannel,weatherstateicon,weathererrorpannel)
{
    //에러 발생시에 handle. 
    let geoInfo;
    const info = JSON.parse(localStorage.getItem(GEOLOC));
    // console.log(`getWeather : pos is ${pos}`);
    // console.log(`getWeather : info is ${info}`);
    if(info!==null){
        geoInfo = info;
        // console.log(`getWeather : geoInfo = ${geoInfo}`);
    }
    else
    {
        geoInfo = saveGeoLoc(pos);
        // console.log(`getWeather : info is not conveyed. geoInfo = ${geoInfo}`);    
    }
   fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${APIKEY}&units=metric`
    ).then(function(response){ //network 정보 => json으로 변경   
        return (response.json());
    }).then(function(json){
        paintWeather(saveWeather(json),weatherstatepannel,weatherstateicon,weathererrorpannel);
    })
}
function getGeolocation(weatherstatepannel,weatherstateicon,weathererrorpannel)
{
    navigator.geolocation.getCurrentPosition(pos=>getWeather(pos,weatherstatepannel,weatherstateicon,weathererrorpannel),paintError(weathererrorpannel,weatherstatepannel));
}
export function refreshWeather(weatherstatepannel,weatherstateicon,weathererrorpannel)
{
    localStorage.setItem(WEATHER,null);
    localStorage.setItem(GEOLOC,null);
    loadWeather(weatherstatepannel,weatherstateicon,weathererrorpannel);
}
function loadGeolocation()
{
    return (JSON.parse(localStorage.getItem(GEOLOC)));
}
export function loadWeather(weatherstatepannel,weatherstateicon,weathererrorpannel)
{
    const weather = JSON.parse(localStorage.getItem(WEATHER));
    if(weather!= null)
    {
        //checkWeather();  
        console.log("Load weather Data in localstorage");
        paintWeather(weather,weatherstatepannel,weatherstateicon,weathererrorpannel);
    }
    else
    {
        const loc = loadGeolocation();
        if (loc !== null)
        {
            console.log(`Load Geo Data in localstorage, loc=${loc}`);
            getWeather(null,weatherstatepannel,weatherstateicon,weathererrorpannel);
        }
        else
        {
            console.log("No GEO, Weather data in LocalStorage");
            getGeolocation(weatherstatepannel,weatherstateicon,weathererrorpannel);
        }
    }
}
