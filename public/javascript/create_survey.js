$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    //initialize all modals
    $("#modalConfirmCreate").modal({
        dismissible: false
    });

    var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
    var userId = userSessionEntity.id;

    $(document).on("click", "#submit", function(event) {
        event.preventDefault();


        var newSurvey = {
            "user_id": userId,
            "survey_name": $("#surveyName").val(),
            "survey_desc": $("#surveyDescription").val(),
            "survey_type": "public",
            "survey_start_date": $("#startDate").val(),
            "survey_end_date": $("#endDate").val(),
            "SurveyQuestions": [{
                "question_type": "choice",
                "question_text": $("#surveyQuestion").val(),
                "SurveyQuestionChoices": [{
                        "choice_text": $("#response1").val()
                    },
                    {
                        "choice_text": $("#response2").val()
                    },
                    {
                        "choice_text": $("#response3").val()
                    },
                    {
                        "choice_text": $("#response4").val()
                    }
                ]
            }]
        };

        var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/" + userId + "/survey";
        // var queryURL = "http://localhost:3000/api/user/" + userId + "/survey";

        $.ajax({
            url: queryURL,
            method: "POST",
            crossDomain: true,
            data: newSurvey,
            dataType: "json"

        }).done(function(newSurveyUrl) {
            console.log(newSurveyUrl);
            $("#aNewSurveyUrl").text(newSurveyUrl);
            $("#aNewSurveyUrl").attr("href", newSurveyUrl);
            $("#modalConfirmCreate").modal("open");

        }).fail(function(xhr, status, error) {
            console.log("User API call failed: " + error);
            window.location.href = "/" + userId + "/survey";

        });

    });



    $(document).on("click", "#btnCloseModal", function(event) {
        console.log("in close modal");
        window.location.href = "/" + userId + "/survey";
    });

});