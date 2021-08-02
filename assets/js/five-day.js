var currentLocation = document.getElementsByClassName("weather-content-overview")[0];
var currentStats = document.getElementsByClassName("weather-content-stats")[0];
var forecast = document.getElementsByClassName("component-forecast-container")[0];

var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=33d588881cf1e072943e6745ea106abc";

function getWeatherData () {

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

var displayForecastWeather = function(data){
    currentLocation.textContent = data.list[0].dt;

}