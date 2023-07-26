import "./styles.css";

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let userCity = "";

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;
let inputCity = document.querySelector("#user-city");
let pCity = document.querySelector("#yourcity");
function displayCity(event) {
  event.preventDefault();
  pCity.innerHTML = inputCity.value;
  userCity = inputCity.value;
  let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showUserCityWeather);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", displayCity);

function showUserCityWeather(response) {
  showUserCityTemp(response);
  showUserCityWind(response);
  showUserCityHumidity(response);
}

function showUserCityTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElem = document.querySelector("#showTemp");
  temperatureElem.innerHTML = `${temperature}°C`;
}

function showUserCityWind(response) {
  console.log(response.data);
  let wind = Math.round(response.data.wind.speed);
  let windElem = document.querySelector("#windSpeedValue");
  windElem.innerHTML = wind;
}
function showUserCityHumidity(response) {
  console.log(response.data);
  let humidity = Math.round(response.data.main.humidity);
  let humidityElem = document.querySelector("#HumidityValue");
  humidityElem.innerHTML = `${humidity}%`;
}
