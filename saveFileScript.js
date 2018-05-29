$("#myForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    if (checkForm() == true) {
        $.ajax({
            url: 'https://ddwap.mah.se/ag7416/server.php',
            type: $(this).attr("method"),
            data: formData,
            dataType: "JSON",
            cache: false,
            contentType: false, // Set correct headers!
            processData: false // Do not process as strings!
        }).done(function(data) {
            console.log(data);
            if (data.success) {
                window.alert("Filen sparad :)");
                console.log("Lyckat!");
                $("#myForm").trigger("reset");
                $("#selectType").next().text("Välj typ här");
            } else {
                console.log("Detta gick ju inget bra");
                alert(data.message);
                $("#file-form").trigger("reset");
                $("#customFile").next().text("Choose file");
            }
        }).fail(function(data) {
            window.alert("Filen sparades inte :(");
            console.log("Misslyckat!");
            console.log(data);
        })
    }
});

function checkForm() {
    if ($("#selectType").val() == "") {
        window.alert("Välj typ av fil");
        return false;
    } else if ($("#chooseFile").val() == "") {
        window.alert("Välj en fil att spara");
        return false;
    } else if ($("#title").val() == "") {
        return false
    } else {
        return true;
    }
}

$("#showMedia").change(function showMedia() {

    emptyMedia();

    if ($(this).val() == "showNone") {
        console.log("EMPTY");
        emptyMedia();
    } else if ($(this).val() == "showAll") {
        console.log("ALL");
        getImages();
        getAudio();
        getVideo();
    } else if ($(this).val() == "showPhoto") {
        console.log("IMAGE");
        getImages();

        // annars om enbart video ska visas hämtas bara video
    } else if ($(this).val() == "showVideo") {
        console.log("VIDEO");
        getVideo();

        // annars om enbart ljudfiler ska visas hämtas bara ljudfiler
    } else if ($(this).val() == "showAudio") {
        console.log("AUDIO");
        getAudio();
    }
});

function emptyMedia() {
    $("#media-row").empty();
}

function getImages() {
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'https://ddwap.mah.se/ag7416/server.php?action=getMedia&type=photo', true);
    httpRequest.send();

    httpRequest.onreadystatechange = function() {
        // Process the server response here.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var json = JSON.parse(httpRequest.responseText);
                var images = json.files;

                for (var i in images) {
                    var filepath = images[i].path;
                    console.log(filepath);
                    var title = images[i].title;
                    $("#media-row").append('<div class="col-lg-4 col-sm-6 row align-items-center">\
                    <div class="container" id="card-container"><p>' + title + '</p><img src="https://ddwap.mah.se/ag7416/' +
                        filepath + '" class="img-thumbnail" alt="Sparad bild' + title + '"></div></div>');
                }
            } else {
                $("#media-row").append(
                    '<div id="card-container"><p>Det finns inga bilder sparade</p></div>');
            }
        }
    };
}

// Hämtar alla videofiler som är sparade och lägger till dem så att de visas för användaren
function getVideo() {
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'https://ddwap.mah.se/ag7416/server.php?action=getMedia&type=video', true);
    httpRequest.send();

    httpRequest.onreadystatechange = function() {
        // Process the server response here.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var json = JSON.parse(httpRequest.responseText);
                var videos = json.files;

                for (var i in videos) {
                    var filepath = videos[i].path;
                    var title = videos[i].title;
                    $("#media-row").append('<div class="col-lg-4 col-sm-6 row align-items-center">\
                        <div id="card-container"><p>' + title +
                        '</p><video width="250" height="150" controls><source src="https://ddwap.mah.se/ag7416/' +
                        filepath + '" type="video/mp4">Your browser does not support the video tag.</video></div></div>');
                }
            } else {
                $("#media-row").append(
                    '<div id="card-container"><p>Det finns inga videofiler sparade</p></div>');
            }
        }
    };
}

// Hämtar alla ljudfiler som är sparade och lägger till dem så att de visas för användaren
function getAudio() {
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'https://ddwap.mah.se/ag7416/server.php?action=getMedia&type=audio', true);
    httpRequest.send();

    httpRequest.onreadystatechange = function() {
        // Process the server response here.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var json = JSON.parse(httpRequest.responseText);
                var sounds = json.files;

                for (var i in sounds) {
                    var filepath = sounds[i].path;
                    var title = sounds[i].title;
                    $("#media-row").append('<div class="col-lg-4 col-sm-6 row align-items-center">\
                         <div id="card-container"><p>' +
                        title + '</p><audio controls><source src="https://ddwap.mah.se/ag7416/' +
                        filepath + '" type="audio/mp3">Your browser does not support the audio tag.</audio></div></div>');
                }
            } else {
                $("#media-row").append(
                    '<div id="card-container"><p>Det finns inga ljudfiler sparade</p></div>');
            }
        }
    };
}