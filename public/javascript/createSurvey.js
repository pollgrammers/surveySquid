$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();

    $(document).on("click", "#submit", function(event) {
        event.preventDefault();

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
        console.log("1");
        // var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/1/survey";
        var queryURL = "http://localhost:3000/api/user/1/survey";
        var postObject = {
            "user_id": "1",
            "survey_name": name,
            "survey_desc": description,
            "survey_type": "public",
            "survey_start_date": startSurvey,
            "survey_end_date": endSurvey,
            "SurveyQuestions": [{
                "question_type": "choice",
                "question_text": question,
                "SurveyQuestionChoices": [{
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
            }]
        };


        console.log(postObject);
        // var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/"+$("#inputSurveyUserId").val()+"/survey/"+$("#inputSurveyId").val()+"/response"; 
        $.ajax({
            url: queryURL,
            method: "POST",
            crossDomain: true,
            data: postObject,

        }).done(function(surveyResponse) {
            console.log(surveyResponse);
            // $("#modalThankYou").modal("open");   

        }).fail(function(xhr, status, error) {
            console.log("User API call failed: " + error);
            // window.location.href = "/";

        });

    });


});