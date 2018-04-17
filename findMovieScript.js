function searchButton() {
    console.log("Knappen tryckt");
    var search = document.getElementById("searchString").value;
    var searchString = search.split(' ').join('+');
    console.log(searchString);

    $.ajax({
        url: "https://www.omdbapi.com/?apikey=bc059aff&s=" + searchString,
        dataType: "JSON"
    }).done(function(data) {
        console.log(data.Search.length);
        console.log(data.Search[0].Title);
        var mediaData = '';
        for (var i = 0; i < data.Search.length; i++) {
            mediaData += '<div class="media">';
            mediaData += '<div class="media-left media-middle">';
            mediaData += '<a href="image">';
            mediaData += '<img class="media-object" src="'
            mediaData += data.Search[i].Poster;
            mediaData += '" alt="image">';
            mediaData += '</a>';
            mediaData += '</div>';
            mediaData += '<div class="media-body">';
            mediaData += '<h6 class="media-heading">';
            mediaData += data.Search[i].Title;
            mediaData += '</h6>';
            mediaData += '</div>';
            mediaData += '</div>';
            mediaData += '<hr>';
        }
        $('#resultList').html(mediaData);

    }).fail(function(data) {

    });
}