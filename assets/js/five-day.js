var currentStats = document.getElementsByClassName("weather-content-stats")[0];

function getWeatherData(cityName) {

    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=33d588881cf1e072943e6745ea106abc";

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

var displayForecastWeather = function (data) {

    currentStats.innerHTML = "";

    for (var i = 0; i < 5; i++) {
        var columnsDivEl = document.createElement("div");
        columnsDivEl.classList = "card-content col";

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
        var tempData =  data.list[i].main.temp;
        tempData = Math.round(((tempData - 273.15) * 9/5 + 32));
        weatherTempEl.textContent = tempData + " °F";
        weatherTempEl.classList = "card-title bold";

        // Weather Description
        var weatherDescriptionEl = document.createElement("p");
        weatherDescriptionEl.textContent = data.list[i].weather[0].description.toUpperCase();
        weatherDescriptionEl.classList = "description";

        // Wind
        var weatherWindEl = document.createElement("p");
        weatherWindEl.textContent = "Wind: " + data.list[i].wind.speed + " mphs";
        
        // Humidity
        var weatherHumidityEl = document.createElement("p");
        weatherHumidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        // gust
        var weatherGustEl = document.createElement("p");
        weatherGustEl.textContent = "Gust: " + data.list[i].wind.gust + " mphs";

        columnsDivEl.append(dateEl, weatherIconEl, weatherTempEl, weatherDescriptionEl, weatherWindEl, weatherHumidityEl, weatherGustEl);
        currentStats.appendChild(columnsDivEl);


        // currentLocation.textContent = data.list[0].dt_txt;

    }
    console.log(currentStats);

}

// fiveDayFormEl.addEventListener("submit", searchCity);
