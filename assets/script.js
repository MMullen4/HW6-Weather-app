var APIKey = "ea678db88cb7433b187a76d0ea5c3d5b";
var city;
var searchBTN = document.querySelector("#search-button")
var cityInput = document.querySelector("#city-input")
var searchHistory = JSON.parse(localStorage.getItem("localCity")) || []

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
            var image_tag = document.createElement("img") //dynamically creating image tag for span tag
            image_tag.setAttribute("src", icon) // adding source icon for image
            document.querySelector("#icon_div").innerHTML = "" // clears out icon_div
            document.querySelector("#icon_div").append(image_tag) // attaches icon to image_tag
            document.querySelector("#date").textContent = new Date(data.dt * 1000).toLocaleDateString()  //formatting code to imperial
            document.querySelector("#CurrentTemp").textContent = "Current Temp: " + data.main.temp + " F"
            document.querySelector("#Wind").textContent = "Wind: " + data.wind.speed + " MPH"
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
            document.querySelector("#forecast").innerHTML = ''; //clears old forecast 
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) { // searches for noon for next 5 days
                    var card = document.createElement("div") // dynamic html div tag
                    card.setAttribute("class", "card")  // adding the class of card to style div
                    var date_tag = document.createElement("h5")
                    date_tag.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString()
                    var icon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                    var image_tag = document.createElement("img")
                    image_tag.setAttribute("src", icon)
                    var temp_tag = document.createElement("h6")
                    temp_tag.textContent = "Temp: " + data.list[i].main.temp + " F"
                    var wind_tag = document.createElement("h6")
                    wind_tag.textContent = "Wind : " + data.list[i].wind.speed + " MPH"
                    var hum_tag = document.createElement("h6")
                    hum_tag.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                    card.append(date_tag, image_tag, temp_tag, wind_tag, hum_tag)
                    document.querySelector("#forecast").append(card)
                }
            }
        })
}
function renderSavedCities() {
    document.querySelector("#history-container").innerHTML = ""
    for (var i = 0; i < searchHistory.length; i++) {
        var cityFolder = document.createElement("div")
        cityFolder.textContent = searchHistory[i]
        cityFolder.setAttribute("onclick", `GetWeather("${searchHistory[i]}")`)
        document.querySelector("#history-container").append(cityFolder)
    }
}
searchBTN.addEventListener("click", function () {
    GetWeather(cityInput.value)
    if (searchHistory.length === 5) {
        var removedElement = searchHistory.shift() //removes 1st element in array


    }
    searchHistory.push(cityInput.value)
    localStorage.setItem("localCity", JSON.stringify(searchHistory))
    renderSavedCities()
})
renderSavedCities();
