const weatherContainer = document.querySelector(".weather-container");
const API_KEYS = `883f192704568f81e08ccd7d56a18e78`;
const POSITION_LS = "position";



function saveCoords(obj) {
    localStorage.setItem(POSITION_LS, JSON.stringify(obj));
}

function onSuccess(pos) {
    const coords = pos.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
}

function onError() {
    const error = new Error(`not found`);
    console.log(error);
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function getWeather(obj) {
    const lat = obj.latitude;
    const lon = obj.longitude;
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            weatherContainer.innerHTML = `<span>${json.main.temp}℃ & ${json.name}</span>`;
        });
}

function showWeather(obj) {
    console.log(obj);
}

const loadedPostion = localStorage.getItem(POSITION_LS);
if (loadedPostion === null) {
    getPosition();
}
const parsedObj = JSON.parse(loadedPostion);
getWeather(parsedObj);