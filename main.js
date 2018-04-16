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
    alert("Latitude: " + lat);

    console.log(5 + 6);
}

function showError() {
    alert("Did not get a response");
}