$(document).ready(function() {
    console.log("working!");

    //date picker
    // $('#sandbox-container input').datepicker({});

    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    // initialize all modals
    $(document).on("click", "#btnNewSurvey", function(event) {
        event.preventDefault();
        console.log("In function submit new survey");
        var newSurvey = {
        	"user_id": 1,
        	"SurveyQuestions": []
        };
        // newSurvey.user_id = 1;
        // newSurvey.survey_name = $("#surveyName").val();
        // newSurvey.survey_desc = $("#surveyDescription").val();
        // newSurvey.survey_type = "public";
        // newSurvey.survey_start_date = $("#surveyStartDate").val();
        // newSurvey.survey_end_date = $("#surveyEndDate").val();
        // var SurveyQuestions = [];
        newSurvey.SurveyQuestions.push({
            "question_type" : "choice",
            "question_text" : $("#surveyQuestion").val()
        });
        // newSurvey.SurveyQuestions1 = SurveyQuestions;
        // newSurvey.SurveyQuestions[0].SurveyQuestionChoices = [];
        // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response1").val() });
        // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response2").val() });
        // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response3").val() });
        // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response4").val() });

        console.log(newSurvey);
        console.log($.fn.jquery);
        $.ajax({
            url: "http://localhost:3000/api/user/1/survey",
            method: "POST",
            crossDomain: true,
            data: newSurvey,
            dataType: 'json',
        }).done(function(user) {
            console.log(user);


            window.location.href = "/survey/1";


        }).fail(function(xhr, status, error) {
            console.log(error);
            window.location.href = "/survey/1";
        });


    });

})