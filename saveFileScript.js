//$("#customFile").on("change", function(e) {
//    var file = this.files[0];
//    console.log("Här 1");
//    $(this).next().text(file.name + " (Storlek: " + Math.round(file.size / (1024)) + " KB)");
//});


$("#myForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
        //url: 'upload.php',
        //type: 'POST',
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: formData,
        dataType: "JSON",
        cache: false,
        contentType: false, // Set correct headers!
        processData: false // Do not process as strings!
    }).done(function(data) {
        console.log(data);
        if (data.success) {
            // Lyckat!
            console.log("Lyckat!");
            $("#file-form").trigger("reset");
            $("#customFile").next().text("Choose file");
        } else {
            // Detta gick ju inget bra
            console.log("Detta gick ju inget bra");
            alert(data.message);
        }
    }).fail(function(data) {
        console.log("Misslyckat!");
        console.log(data);
    })
});