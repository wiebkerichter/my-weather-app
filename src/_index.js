// Set current time
function setCurrentTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date}/${month}/${year} ${hours}:${minutes}`;
}

let time = document.querySelector("#current-time");
let now = new Date();

time.innerHTML = setCurrentTime(now);

// Search location and set temperature
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#current-location");

  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = `Please search for a city`;
  }

  let EndpointUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "c2d2195e44523aab9b31a24839cab246";
  let citySelector = city.innerHTML;
  let units = `metric`;
  let apiUrl = `${EndpointUrl}&q=${citySelector}&units=${units}&appid=${apiKey}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let setTemperature = document.querySelector("#temperature");
    setTemperature.innerHTML = `${temperature}`;
  }

  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Get Current Position

function showPosition(position) {
  let setLocation = document.querySelector("#current-location");
  setLocation.innerHTML = `${position.coords.latitude} ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button-location");
button.addEventListener("click", getCurrentPosition);

// Celsius to Fahrenheit
function changeToFahrenheit(event) {
  event.preventDefault();
  let setTemperature = 10;
  let temperature = document.querySelector("#temperature");
  let temperatureFahrenheit = Math.round((setTemperature * 9) / 5 + 32);
  temperature.innerHTML = `${temperatureFahrenheit}`;
}

function changeToCelsius(event) {
  event.preventDefault();
  let setTemperature = 10;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${setTemperature}`;
}

let currentUnitFahrenheit = document.querySelector("#unit-fahrenheit");
currentUnitFahrenheit.addEventListener("click", changeToFahrenheit);

let currentUnitCelsius = document.querySelector("#unit-celsius");
currentUnitCelsius.addEventListener("click", changeToCelsius);
