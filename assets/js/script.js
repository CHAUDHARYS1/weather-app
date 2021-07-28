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

// from handler function
var formSubmitHandler = function (event) {
    // prevent the form from reloading the page
    event.preventDefault();

    // get value from search input
    var search = searchEl.value.trim();

    // form error handler
    if (search) {
        getCity(search);
        searchEl.value = "";
    } else {
        alert("Bro, you need to add the correct city");
    }
}
// action: form is submitted
userFormEl.addEventListener("submit", formSubmitHandler);

// funtion to fetch weather data
var getCity = function () {
    var cityName = "chicago";
    // api source
    //https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${tempUnit}
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=33d588881cf1e072943e6745ea106abc&units=$tempUnit`;

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
        displayWeather(data);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
};

getCity();

// function: display searched city 
var displayWeather = function(data){
    cityNameHeading.textContent = data.name;
    // var city = data.name;
    // cityNameHeading.appendChild(city);
}