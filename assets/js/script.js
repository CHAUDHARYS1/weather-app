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

// delete local storage btn
var deleteRecentSearchesBtn = document.querySelector("#delete-recent-searches");
var recentSearchContainer = document.querySelector("#recent-search");


var apiKey = "33d588881cf1e072943e6745ea106abc";
var tempUnit = "imperial";


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
  } 
  // else if (search !== displayWeather(data)){
  //     alert("please enter a correct city");
  // }
  else {
    getCity(search);
    getWeatherData(search);
    saveCity(search);
    getRecentSearches();
    searchEl.value = '';
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
  var mainEl = document.querySelector("main");
  mainEl.style.display = "block";

  cityNameHeading.textContent = data.name + ", " + data.sys.country;
 
  var description = document.querySelector("#description");
  description.textContent = data.weather[0].description.toUpperCase();
  description.classList = "description";

  var weatherIcon = document.querySelector("#icon");
  var weatherIconEl = document.createElement("img");
  //10d@2x
  weatherIconEl.setAttribute("src","http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
  weatherIcon.innerHTML = "";
  weatherIcon.appendChild(weatherIconEl);

  var temp = document.querySelector("#temp");
  temp.textContent = data.main.feels_like + " °F";
  temp.classList = "heading-h1";

  var wind = document.querySelector("#wind");
  wind.textContent = "Wind: " + data.wind.speed + " mphs";

  var humidity = document.querySelector("#humidity");
  humidity.textContent = "Humidity: " + data.main.humidity + "%";

  var gust = document.querySelector("#gust");
  gust.textContent = "Gust: " + data.wind.gust + " mphs";
}


var getRecentSearches = function(){
  var recentSearches = JSON.parse(localStorage.getItem("City")) || [];
  recentSearchContainer.innerHTML = "";
  for (var i = 0; i < recentSearches.length; i++) {
    var recentSearchBtn = document.createElement("button");
    recentSearchBtn.classList = "chip border-none";
    recentSearchBtn.innerHTML = recentSearches[i];
    recentSearchContainer.appendChild(recentSearchBtn);
  }
}


var saveCity = function(city){
  var storeCities = JSON.parse(localStorage.getItem("City")) || [];
  storeCities.push(city);
  localStorage.setItem("City", JSON.stringify(storeCities));
}

var deleteRecentSearches = function(){
  localStorage.removeItem("City");
  
  while (recentSearchContainer.firstChild) {
    recentSearchContainer.removeChild(recentSearchContainer.firstChild);
}
}

var recentSearchHandler = function(data) {
  var btnText = data.target.textContent;
  getCity(btnText);
  getWeatherData(btnText);
  // console.log(data.target.textContent);
}

recentSearchContainer.addEventListener("click",recentSearchHandler);
deleteRecentSearchesBtn.addEventListener("click", deleteRecentSearches);
getRecentSearches();