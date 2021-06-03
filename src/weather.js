const API_KEYS = `883f192704568f81e08ccd7d56a18e78`;
const POSITION_LS = "position";

const weatherContainer = document.querySelector(".header__weather");

function savePosition(obj) {
    localStorage.setItem(POSITION_LS, JSON.stringify(obj));
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude,
        longitude
    }
    savePosition(positionObj);
}

function onError() {
    const error = new Error(`Not Found`);
    console.log(error);
}

function getWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`)
        .then(response => response.json())
}

const Position = localStorage.getItem(POSITION_LS);
const parsedPosition = JSON.parse(Position);
if (parsedPosition === null) {
    getPosition();
}
const lat = parsedPosition.latitude;
const lon = parsedPosition.longitude;
getWeather(lat, lon)
    .then(item => {
        console.log(item);
        const city = item.name;
        const temp = item.main.temp;
        const weather = item.weather[0].main;
        let iconClass = undefined;
        switch (weather) {
            case "Mist":
            case "Rain":
                iconClass = "fas fa-cloud-rain";
                break;
            case "clear":
            case "Sunny":
                iconClass = "far fa-sun";
                break;
            case "Clouds":
                iconClass = "fas fa-cloud";
                break;
            case "Snowy":
                iconClass = "far fa-snowflake";
                break;
            default:
                throw new Error(`Put wrong weather`);
        }
        weatherContainer.innerHTML=`<span class="location">${city}</span>
        <span class="temp-weather">${temp}°C <i class="${iconClass}"></i></span>`
})
