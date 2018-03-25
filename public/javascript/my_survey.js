$(function() {
    //For responsive navbar
    $(".dropdown-button").dropdown({ hover: false });
    $(".button-collapse").sideNav();
    //initialize all modals
    $(".modal").modal({
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
            dataType: "jsonp",
        }).done(function(surveyResult) {


            console.log(surveyResult[0]);
            var labels = [];
            var data = [];
            for (i = 0; i < surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices.length; i++) {
                labels.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].choice_text);
                if (surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].SurveyResponse !== null) {
                    data.push(surveyResult[0].SurveyQuestions[0].SurveyQuestionChoices[i].SurveyResponse.choice_count);
                } else {
                    data.push(0);
                }

            }
            var popCanvas = document.getElementById("popChart");
            var barChart = new Chart(popCanvas, {
                type: "horizontalBar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "User Choice",
                        data: data,
                        backgroundColor: [
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)"
                        ],
                        borderWidth: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: "black",
                            fontSize: 20
                        }
                    }
                }
            });
            $("#modelResultSurveyName").text(surveyResult[0].survey_name);
            $("#modelResultSurveyQuestion").text(surveyResult[0].SurveyQuestions[0].question_text);
            $("#modalSurveyResult").modal("open");
        }).fail(function(xhr, status, error) {
            console.log(error);
        });
    });



});