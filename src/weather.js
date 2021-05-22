const weatherSummary = document.querySelector(".weather__summary__text");
const weatherTemp = document.querySelector(".weather__temp");
const recommendation=document.querySelector(".weather__recommend");
const weatherContainer = document.querySelector(".weather-container");
const recommendationUrl = document.querySelector(".weather__recommend-url");
console.log(recommendationUrl);


const API_KEYS = `883f192704568f81e08ccd7d56a18e78`;
const POSITION_LS = "position";

const loadedPostion = localStorage.getItem(POSITION_LS);
if (loadedPostion === null) {
    getPosition();
}
const parsedObj = JSON.parse(loadedPostion);
getWeather(parsedObj);
weatherContainer.addEventListener("click", onClickContainer);

function onClickContainer(event) {
    const target = event.target;
    console.log(target);
    if (target.matches(".weather__temp-btn")){
        weatherTemp.classList.toggle("weather__visible");
    } else if (target.matches(".weather__recommend-btn")){
        recommendation.classList.toggle("weather__visible");
    } else{
        return;
    }
}


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
            const weather = json.weather[0].main;
            console.log(weather==="Clouds");
            switch (weather) {
                case 'Clear':
                    recommendationUrl.setAttribute("href", "https://www.youtube.com/watch?v=HGrP1qdE5Rw");
                    break;
                case "Clouds":
                    recommendationUrl.setAttribute("href", "https://www.youtube.com/watch?v=J79HVjqxejs&t=5375s");
                    break;
                case '':
                    break;
                default:
                    throw new Error(`Get Wrong Weather`);
            }
            weatherSummary.innerText = `${json.main.temp}℃ & ${json.name} & ${weather}`;
            weatherTemp.innerHTML=` Feelslike:${json.main.feels_like}℃<br>TempMax:${json.main.temp_max}℃<br>TempMin:${json.main.temp_min}℃`
        });
}

function showWeather(obj) {
    console.log(obj);
}
