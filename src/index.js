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
let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

getCityWeather("New York");

function displayCityBtnAction(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#user-city");
  getCityWeather(inputCity.value);
}

function getCityWeather(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showUserCityWeather);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", displayCityBtnAction);

function showUserCityWeather(response) {
  showUserCityTemp(response);
  showUserCityWind(response);
  showUserCityHumidity(response);
  showUserCityDesc(response);
  showUserCityIcon(response);
  document.querySelector("#yourcity").innerHTML = response.data.name;
  showForecast(response.data.coord.lat, response.data.coord.lon);
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
function showUserCityDesc(response) {
  console.log(response.data);
  let description = response.data.weather[0].description;
  let descriptionElem = document.querySelector("#description");
  descriptionElem.innerHTML = `${description}`;
}
function showUserCityIcon(response) {
  console.log(response.data);
  let icon = response.data.weather[0].icon;
  let iconElem = document.querySelector("#my-weather-img");
  iconElem.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function showForecast(lat, lon) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecastCols);
}

function showForecastCols(res) {
  console.log(res);
  let days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
  let forecastingDays = res.data.daily;
  let forecastHTML = "";
  forecastingDays.forEach(function (dayForecast, index) {
    if (index < 5) {
      let dayDate = new Date(dayForecast.dt * 1000);
      let dayName = days[dayDate.getDay()];
      let weatherIcon = dayForecast.weather[0].icon;
      let minTemp = Math.round(dayForecast.temp.min);
      let maxTemp = Math.round(dayForecast.temp.max);
      forecastHTML += `<div class="col">
          <div class="weather-day">
            ${dayName}
            <br />
            <img
              src="https://openweathermap.org/img/wn/${weatherIcon}.png"
              width="42"
            />
            <br />
            ${minTemp}°/${maxTemp}°
            <br />
          </div>
        </div>`;

      let forecastRow = document.querySelector("#forecast");
      forecastRow.innerHTML = forecastHTML;
    }
  });
}
