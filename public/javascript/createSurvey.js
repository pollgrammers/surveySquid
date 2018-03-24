$(document).ready(function(){
    console.log("working!");

    //Get the form
    var form = $('#ajax-createSurvey');
    //Get the message div
    var formMessages = $('#form-messages');

    //date picker
    $('#sandbox-container input').datepicker({
    });

    $("#submit").on("click", function(){
        var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/{id}/survey";

        //Performing AJAX Get request to our queryURl
        $.ajax({
            url: queryURL,
            method: "POST"
          })

        // After the data from the AJAX request comes back
        .done(function(response) {
            console.log().text(JSON.stringify(
                response));

      });

    });

})