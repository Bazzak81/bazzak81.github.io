console.log(5+6);

$(document).ready(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else{
        alert("Din webbläsare stödjer inte geolocation");
    }
});

function showPosition(position){
    alert(JSON.stringify(position));
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    alert("Latitude: "+lat);
}
