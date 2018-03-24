$(document).ready(function(){
    console.log("working!");

    //Get the form
    var form = $('#ajax-createSurvey');
    //Get the message div
    var formMessages = $('#form-messages');

    // //date picker
    // $('#sandbox-container input').datepicker({
    // });

    $("#submit").on("click", function(event) {

        var name = $("#surveyName").val();
        var description = $("#surveyDescription").val();
        var question = $("#surveyQuestion").val();
        var r1 = $("#response1").val();
        var r2 = $("#response2").val();
        var r3 = $("#response3").val();
        var r4 = $("#response4").val();
        var r5 = $("#response5").val();
        var startSurvey = $("#startDate").val();
        var endSurvey = $("#endDate").val();
        var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/1/survey";
        var postObject = {
            "user_id": "1",
            "survey_name": name,
            "survey_desc": description,
            "survey_type": "public",
            "survey_start_date": startSurvey,
            "survey_end_date": endSurvey,
            "SurveyQuestions": [
                {
            "question_type": "choice",
            "question_text": question,
            "SurveyQuestionChoices": [
                {
                    "choice_text": r1
                },
                {
                    "choice_text": r2
                },
                {
                    "choice_text": r3
                },
                {
                    "choice_text": r4
                },
                {
                    "choice_text": r5
                }
            ]
        }
    ]
        }

        //Performing AJAX Get request to our queryURl
        $.ajax({
            url: queryURL,
            method: "POST",
            data: postObject,
          })

        // After the data from the AJAX request comes back
        .done(function(response) {
            window.location.href = "http://localhost:3000/viewSuvery.html";

      });

    });

});