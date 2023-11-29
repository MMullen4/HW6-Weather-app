var APIKey = "ea678db88cb7433b187a76d0ea5c3d5b";
var city;
var searchBTN = document.querySelector("#search-button")
var cityInput = document.querySelector("#city-input")

function GetWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            console.log(response)
            return response.json()
        }).then(function (data) {
            console.log(data)  //apply current weather 
            document.querySelector("#CityName").textContent = data.name
            var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
            var image_tag = document.createElement("img")
            image_tag.setAttribute("src", icon)
            document.querySelector("#icon_div").innerHTML = ""
            document.querySelector("#icon_div").append(image_tag)
            document.querySelector("#date").textContent = new Date(data.dt * 1000).toLocaleDateString()
            document.querySelector("#CurrentTemp").textContent = "Current Temp: " + data.main.temp + "F"
            document.querySelector("#Wind").textContent = "Wind: " + data.wind.speed + "MPH"
            document.querySelector("#Humidity").textContent = "Humidity: " + data.main.humidity + "%"
            GetForcast(data.coord.lat, data.coord.lon);
        })
}
function GetForcast(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            //    console.log(response)
            return response.json()
        }).then(function (data) {
            console.log(data) // apply forcasted weather
            for (i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) {
                    var card = document.createElement("div")
                    card.setAttribute("class", "card")
                    var date_tag = document.createElement("p")
                    date_tag.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString()

                    var icon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                    var image_tag = document.createElement("img")
                    image_tag.setAttribute("src", icon)

                    var temp_tag = document.createElement("p")


                    //create p tags for temp wind & humidity

                    card.append(date_tag, image_tag)
                    document.querySelector("#forecast").append(card)
                }
            }
        })
}
searchBTN.addEventListener("click", function () {
    GetWeather(cityInput.value)
})