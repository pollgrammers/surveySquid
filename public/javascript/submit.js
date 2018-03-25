$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    //initialize all modals
    $("#modalThankYou").modal({
        dismissible: false
    });

    $(document).on("click", "#btnSubmitSurveyResponse", function(event) {

        var form = $("#formSurvey").serialize();
        console.log(form);

        var formData = {};
        form.split("&").forEach(function(part) {
            var item = part.split("=");
            formData[item[0]] = item[1];
        });

        var respondentUserId = null;
        if(sessionStorage.getItem("userSessionEntity") != null){
            var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
            respondentUserId = parseInt(userSessionEntity.id);
        }


        var surveyResponse = {};
        surveyResponse.SurveyQuestions = [];
        var SurveyQuestion = {};
        SurveyQuestion.respondent_user_id = respondentUserId;
        SurveyQuestion.question_id = parseInt(formData.question_id);
        SurveyQuestion.choice_id = parseInt(formData.inputChoice);

        surveyResponse.SurveyQuestions.push(SurveyQuestion);

        console.log(surveyResponse);
        var queryUrl = "https://floating-temple-72911.herokuapp.com/api/user/"+$("#inputSurveyUserId").val()+"/survey/"+$("#inputSurveyId").val()+"/response"; 
        $.ajax({
            url: queryUrl,
            method: "POST",
            crossDomain: true,
            data: surveyResponse,

        }).done(function(surveyResponse) {
            console.log(surveyResponse);
            $("#modalThankYou").modal("open");   

        }).fail(function(xhr, status, error) {
            console.log("User API call failed: " + error);
            window.location.href = "/";

        });

    });


    $(document).on("click", "#btnCloseModal", function(event) {
        $("#modalThankYou").modal("close");
        window.location.href = "/";
    });
});