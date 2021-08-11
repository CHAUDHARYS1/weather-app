// select entire form
var userFormEl = document.querySelector("#user-form")

// select search input 
var searchEl = document.querySelector("#search");

// select container where info will be displayed
var cityContainerEl = document.querySelector("#main-city-container");

// select span where search word will be dispalyed
var citySearchTermEl = document.querySelector("#city-search-term");

// 
var cityNameHeading = document.querySelector("#city-name-heading")

var apiKey = "33d588881cf1e072943e6745ea106abc";
var tempUnit = "imperial";

// close about me component
var exitWeatherCard = document.querySelector("#exit-card");
exitWeatherCard.style.cursor = "pointer";

var closeAbout = function () {
  var aboutWeatherDashboard = document.querySelector("#about-weather-dashboard");
  if (exitWeatherCard) {
    aboutWeatherDashboard.remove();
  }
}
exitWeatherCard.addEventListener("click", closeAbout);

// from handler function
var formSubmitHandler = function (event) {
  // prevent the form from reloading the page
  event.preventDefault();

  // get value from search input
  var search = searchEl.value.trim();
  console.log(search);
  // form error handler
  if (search === "" || search === null) {
    alert("Please enter a city name");
  } else{
    getCity(search);
    getWeatherData(search);
    saveCity(search);
  }
}
// action: form is submitted
userFormEl.addEventListener("submit", formSubmitHandler);

// funtion to fetch weather data
var getCity = function (cityName) {
  // api source: https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${tempUnit}
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=33d588881cf1e072943e6745ea106abc&units=" + tempUnit;

  // fetch api
  fetch(apiUrl).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {
      console.log(data);
      return displayWeather(data);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
};

// function: display searched city 
var displayWeather = function (data) {
  cityNameHeading.textContent = data.name + ", " + data.sys.country;
  // var city = data.name;
  // cityNameHeading.appendChild(city);
  var description = document.querySelector("#description");
  description.textContent = data.weather[0].description.toUpperCase();

  var weatherIcon = document.querySelector("#icon");
  var weatherIconEl = document.createElement("img");
  //10d@2x
  weatherIconEl.setAttribute("src","http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
  weatherIcon.innerHTML = "";
  weatherIcon.appendChild(weatherIconEl);

  var temp = document.querySelector("#temp");
  temp.textContent = data.main.feels_like + " °F";

  var wind = document.querySelector("#wind");
  wind.textContent = "Wind: " + data.wind.speed + " mphs";

  var humidity = document.querySelector("#humidity");
  humidity.textContent = "Humidity: " + data.main.humidity + "%";

  var gust = document.querySelector("#gust");
  gust.textContent = "Gust: " + data.wind.gust + " mphs";
}

var saveCity = function(city){
  var storeCities = JSON.parse(localStorage.getItem("City")) || [];
  storeCities.push(city);
  localStorage.setItem("City", JSON.stringify(storeCities));
}