$("#customFile").on("change", function(e) {
    var file = this.files[0];
    window.log("Här 1");
    $(this).next().text(file.name + " (Storlek: " + Math.round(file.size / (1024)) + " KB)");

});

$("#file-form").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    window.log("Här 2");

    $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: formData,
        dataType: "JSON",
        cache: false,
        contentType: false, // Set correct headers!
        processData: false // Do not process as strings!
    }).done(function(data) {

        window.log("Här 3");

        if (data.success) {
            // Lyckat!
            console.log("Lyckat!");
            $("#file-form").trigger("reset");
            $("#customFile").next().text("Choose file");
        } else {
            // Detta gick ju inget bra
            alert(data.message);
        }
    });
});