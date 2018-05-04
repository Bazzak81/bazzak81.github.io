$("#myForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
        url: 'http://ddwap.mah.se/ag7416/server.php',
        type: $(this).attr("method"),
        data: formData,
        dataType: "JSON",
        cache: false,
        contentType: false, // Set correct headers!
        processData: false // Do not process as strings!
    }).done(function(data) {
        console.log(data);
        if (data.success) {
            console.log("Lyckat!");
            $("#file-form").trigger("reset");
            $("#customFile").next().text("Choose file");
        } else {
            console.log("Detta gick ju inget bra");
            alert(data.message);
        }
    }).fail(function(data) {
        console.log("Misslyckat!");
        console.log(data);
    })
});