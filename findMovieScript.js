$(document).ready(function() {
    if (localStorage.getItem("favorit") != null) {
        var para = document.createElement("span");
        var node = document.createTextNode("Favoritfilm: " + localStorage.getItem("favorit"));
        para.appendChild(node);
        para.setAttribute("id", "favoritMovie");
        para.className += "nav-text";
        var element = document.getElementById("navbarNavAltMarkup");
        element.appendChild(para);

    }
});


function searchButton() {
    console.log("Knappen tryckt");
    var search = document.getElementById("searchString").value;
    var searchString = search.split(' ').join('+');
    if (searchString.substring(searchString.length - 1) == "+") {
        searchString = searchString.substring(0, searchString.length - 1);
    }
    console.log(searchString);

    $.ajax({
        url: "https://www.omdbapi.com/?apikey=bc059aff&s=" + searchString,
        dataType: "JSON"
    }).done(function(data) {
        if (data.Response == "False") {
            window.alert(data.Error);
        } else {
            var mediaData = '';
            for (var i = 0; i < data.Search.length; i++) {
                mediaData += '<div class="media">';

                //Image to the left
                mediaData += '<div class="media-left">';
                mediaData += '<img class="media-object" src="' + data.Search[i].Poster + '" alt="image">';
                mediaData += '</div>';

                //Text in the middle
                mediaData += '<div class="media-body">';
                mediaData += '<h6 class="media-heading">' + data.Search[i].Title + ' (' + data.Search[i].Year + ')' + '</h6>';
                mediaData += '</div>';

                //Button to the right
                mediaData += '<div class="media-right">';
                mediaData += '<button type="button" id="' + data.Search[i].Title + '">Favorit</button>';
                mediaData += '</div>';

                mediaData += '</div>';
                mediaData += '<hr>';
            }
            $('#resultList').html(mediaData);
            for (var i = 0; i < data.Search.length; i++) {
                document.getElementById(data.Search[i].Title).onclick = buttonId;
            }
        }

    }).fail(function(data) {
        window.alert("Ingen kontakt med databasen");

    });
}

var buttonId = function() {
    console.log("Favorit id " + this.id);
    if (localStorage.getItem("favorit") == null) {
        localStorage.setItem("favorit", this.id);
        var para = document.createElement("span");
        var node = document.createTextNode("Favoritfilm: " + localStorage.getItem("favorit"));
        para.appendChild(node);
        para.setAttribute("id", "favoritMovie");
        para.className += "nav-text";
        var element = document.getElementById("navbarNavAltMarkup");
        element.appendChild(para);
    } else {
        localStorage.setItem("favorit", this.id);
        var para = document.createElement("span");
        var node = document.createTextNode("Favoritfilm: " + localStorage.getItem("favorit"));
        para.appendChild(node);
        para.setAttribute("id", "favoritMovie");
        para.className += "nav-text";
        var parent = document.getElementById("navbarNavAltMarkup");
        var child = document.getElementById("favoritMovie");
        parent.replaceChild(para, child);
    }
}