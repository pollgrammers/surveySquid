$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    //initialize all modals
    $(".modal").modal({
        dismissible: true
    });

    //get the current user from session
    var userSessionEntity = JSON.parse(sessionStorage.getItem("userSessionEntity"));
    var userId = userSessionEntity.id;

    $(document).on("click", ".view-survey", function(event) {
        console.log("In function view survey result");

        var surveyId = $(this).attr("id");
        // var queryUrl = "http://localhost:3000/api/user/" + userId + "/survey/" + surveyId + "/response";
        var queryUrl = "https://floating-temple-72911.herokuapp.com/api/user/" + userId + "/survey/" + surveyId + "/response";

        $.ajax({
            url: queryUrl,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp",
        }).done(function(surveyResult) {

            console.log(surveyResult[0]);
            var choices = [
                ["Choice", "Votes"]
            ];
            var choice = [];
            for (i = 0; i < surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices.length; i++) {
                choice = [];
                choice.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].choice_text);
                if (surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].SurveyResponse !== null) {
                    choice.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].SurveyResponse.choice_count);
                } else {
                    choice.push(0);
                }
                choices.push(choice);
            }
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            // Draw the chart and set the chart values
            function drawChart() {
                var data = google.visualization.arrayToDataTable(choices);

                // Optional; add a title and set the width and height of the chart
                var options = {
                    'title': surveyResult[0].SurveyQuestions[0].question_text,
                    'width': 400,
                    'height': 300
                };

                // Display the chart inside the <div> element with id="barChart"
                var chart = new google.visualization.BarChart(document.getElementById("barChart"));
                chart.draw(data, options);
            }

            $("#modelResultSurveyName").text("Results for Survey: " + surveyResult[0].survey_name);
            $("#modalSurveyResult").modal("open");
        }).fail(function(xhr, status, error) {
            console.log(error);
        });
    });


    $(document).on("click", ".share-survey", function(event) {
        console.log("In function view survey result");
        var surveyId = $(this).attr("id");
        var surveyUrl = "https://floating-temple-72911.herokuapp.com/survey/" + surveyId + "/respond";
        $("#aSurveyUrl").text(surveyUrl);
        $("#aSurveyUrl").attr("href", surveyUrl);
        $("#aFacebookShare").attr("href", "https://www.facebook.com/sharer.php?u=" + surveyUrl);
        $("#aTwitterShare").attr("href", "https://twitter.com/share?url=" + surveyUrl + "&amp;text=Take my survey on SurveySquid &amp;hashtags=SurveySquid");
        $("#aLinkedInShare").attr("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + surveyUrl);
        $("#modalSurveyShare").modal("open");

    });


    $(document).on("click", "#btnCloseModal", function(event) {
        console.log("in close modal");
        $("#modalSurveyResult").modal("close");
        $("#modalSurveyShare").modal("close");
    });

});