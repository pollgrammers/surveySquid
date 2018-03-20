$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    //initialize all modals
    $('.modal').modal({
        dismissible: true
    });

    //get the current user from session
    var userSessionEntity = {
        "email": "someuser"
    };
    // var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
    $(document).on("click", ".view-survey", function(event) {
        console.log("In function view survey result");

        var surveyId = $(this).attr("id");
        // var queryUrl = "http://localhost:3000/api/user/1/survey/1/response";
        var queryUrl = "https://floating-temple-72911.herokuapp.com/api/user/1/survey/1/response";
        
        $.ajax({
            url: queryUrl,
            method: "GET",
            crossDomain: true,
            dataType: 'jsonp',
        }).done(function(surveyResult) {

            console.log(surveyResult[0]);
            var labels = [];
            var data = [];
            for(i=0; i<surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices.length; i++){
                labels.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].choice_text);
                data.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].SurveyResponse.choice_count);
            }
            var popCanvas = document.getElementById("popChart");
            var barChart = new Chart(popCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'User Choice',
                        data: data
                    }]
                }
            });

            $('#modelSurveyResult').modal('open');
        }).fail(function(xhr, status, error) {
            console.log(error);
        });
    });



});