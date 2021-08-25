// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

// var lat = response.city.coord.lat;
//       var lon = response.city.coord.lon;
// var apiKey = "33d588881cf1e072943e6745ea106abc";
// function getUvIndex(uv) {

//     var apiUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&appid=" + apiKey + "&units=imperial";

//     // fetch api
//     fetch(apiUV).then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("NETWORK RESPONSE NOT OK");
//             }
//         })
//         .then(function (data) {
//             console.log(data);
//             // displayForecastWeather(data);
//         })
//         .catch((error) => {
//             console.error("FETCH ERROR:", error);
//         });
// }