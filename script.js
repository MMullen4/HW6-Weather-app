var APIKey = "ea678db88cb7433b187a76d0ea5c3d5b";
var city;
var searchBTN = document.querySelector("#search-button")
var cityInput = document.querySelector("#city-input")

function GetWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey +"&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            console.log(response)
            return response.json()
        }).then(function (data) {
        console.log(data)
    })
}

searchBTN.addEventListener("click", function () {
    GetWeather(cityInput.value)
})