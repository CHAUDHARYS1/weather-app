var currentLocation = document.getElementsByClassName("weather-content-overview")[0];
var currentStats = document.getElementsByClassName("weather-content-stats")[0];
var forecast = document.getElementsByClassName("component-forecast-container")[0];

var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=33d588881cf1e072943e6745ea106abc";

function getWeatherData() {

    // fetch api
    fetch(apiForecastUrl).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
        })
        .then(function (data) {
            console.log(data);
            displayForecastWeather(data);
        })
        .catch((error) => {
            console.error("FETCH ERROR:", error);
        });
}
getWeatherData()

var displayForecastWeather = function (data) {

    for (var i = 0; i < 5; i++) {
        // Date
        var forecastedDate = new Date(data.list[i].dt * 1000);
        var dateEl = document.createElement("p");
        dateEl.textContent = forecastedDate.toLocaleDateString();
        
        // Weather
        var weatherIcon = JSON.stringify(data.list[i].weather[0].icon);
        weatherIcon = weatherIcon.slice(1, -1);
        weatherIcon = weatherIcon.split(" ")[0];
        var weatherIconEl = document.createElement("img");
        weatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png");
       
        // Weather Tempreture
        var weatherTempEl = document.createElement("p");
        weatherTempEl.textContent = data.list[i].main.temp;

        // Weather Description
        var weatherDescriptionEl = document.createElement("p");
        weatherDescriptionEl.textContent = data.list[i].weather[0].description;

        // Wind
        var weatherWindEl = document.createElement("p");
        weatherWindEl.textContent = "Wind: " + data.list[i].wind.speed + " mphs";
        
        // Humidity
        var weatherHumidityEl = document.createElement("p");
        weatherHumidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        // gust
        var weatherGustEl = document.createElement("p");
        weatherGustEl.textContent = "Gust: " + data.list[i].wind.gust + " mphs";

        currentStats.append(dateEl, weatherIconEl, weatherTempEl, weatherDescriptionEl, weatherWindEl, weatherHumidityEl, weatherGustEl);



        // currentLocation.textContent = data.list[0].dt_txt;

    }
    console.log(currentStats);

}