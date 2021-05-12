const POSITION_LS = "position";
const API_KEY = "883f192704568f81e08ccd7d56a18e78";

function saveLocation(obj){
    localStorage.setItem(POSITION_LS, JSON.stringify(obj));
}

function showIcon(weather) {
    const weather__icons = document.querySelectorAll(".weather__icon");
    console.log(weather__icons);
    weather__icons.forEach(icon => {
        if (icon.classList.contains(weather))
            icon.classList.add("icon-showing");
    })
}

function showWeather(json) {
    console.log(json);
    const weather = json.weather[0].main;
    console.log(weather);
    const spanTemp = document.createElement("span");
    const spanLoc = document.createElement("span");
    spanTemp.innerText = `${json.main.temp}°C`;
    spanLoc.innerText = `${json.name}`;
    weatherContainer.appendChild(spanTemp);
    weatherContainer.appendChild(spanLoc);
    showIcon(weather);
}

function getWeather(obj) {
    const lat = obj.latitude;
    const lon = obj.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(json => showWeather(json));
}

function success(info) {
    const coords = info.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveLocation(coordsObj);
}

function error() {
    const error = new Error(`not found`);
    console.log(error);
}

function askPosition() {
    navigator.geolocation.getCurrentPosition(success, error);
}





const loadPosition = localStorage.getItem(POSITION_LS);
if (loadPosition === null) {
    askPosition();
}
const parsedLoaction = JSON.parse(loadPosition)
const weatherContainer = document.querySelector(".weather-Container");
getWeather(parsedLoaction);