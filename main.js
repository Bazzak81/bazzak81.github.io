$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Din webbläsare stödjer inte geolocation");
    }
});

function showPosition(position) {
    JSON.stringify(position);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(parseInt(lat));
    console.log(lon);

    getWeather(lat, lon);
}

function showError() {
    alert("Did not get a response");
}

function getWeather(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + parseInt(lat) + "&lon=" + parseInt(lon) + "&APPID=92d45b077fa249614bfc79c61cf8b50f&units=metric",
        dataType: "JSON"
    }).done(function(data) {
        document.getElementById("temp").innerHTML = data.main.temp;
        document.getElementById("weather_image").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        document.getElementById("weather").innerHTML = data.weather[0].description;
        console.log(data.weather[0].icon);
        console.log("Ajax-anrop klart, lyckades!");
    }).fail(function(data) {
        console.log("Ajax-anrop klart, misslyckat!");
    });
}