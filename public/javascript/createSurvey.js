$(document).ready(function() {
    console.log("working!");

    //Get the form
    var form = $('#ajax-createSurvey');
    //Get the message div
    var formMessages = $('#form-messages');

    // //date picker
    // $('#sandbox-container input').datepicker({
    // });

    $("#submit").on("click", function(event) {
        console.log("In 1");
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
        var queryURL = "http://localhost:3000/api/user/1/survey";
        console.log("In 2");
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
        console.log("In 3");
        //Performing AJAX Get request to our queryURl
        // $.ajax({
        //         url: queryURL,
        //         method: "POST",
        //         data: postObject,
        //     })

        //     // After the data from the AJAX request comes back
        //     .done(function(response) {
        //         window.location.href = "http://localhost:3000/viewSuvery.html";

        //     });



        $.ajax({
            url: queryURL,
            method: "POST",
            crossDomain: true,
            data: postObject,
            dataType: 'json',
        }).done(function(user) {
            console.log(user);


            window.location.href = "/survey/1";


        }).fail(function(xhr, status, error) {
            console.log(error);
            window.location.href = "/survey/1";
        });

    });

});

// $(document).ready(function() {
//     console.log("working!");

//     //Get the form
//     var form = $('#ajax-createSurvey');
//     //Get the message div
//     var formMessages = $('#form-messages');

//     //date picker
//     // $('#sandbox-container input').datepicker({});

//     //For responsive navbar
//     $(".dropdown-button").dropdown({ hover: false });
//     $(".button-collapse").sideNav();
//     // initialize all modals
//     $(document).on("click", "#btnNewSurvey", function(event) {
//         event.preventDefault();
//         console.log("In function submit new survey");
//         var newSurvey = {};
//         // 	"user_id": 1,
//         // 	"SurveyQuestions": []
//         // };
//         newSurvey.user_id = 1;
//         newSurvey.SurveyQuestions = [];
//         // newSurvey.survey_name = $("#surveyName").val();
//         // newSurvey.survey_desc = $("#surveyDescription").val();
//         // newSurvey.survey_type = "public";
//         // newSurvey.survey_start_date = $("#surveyStartDate").val();
//         // newSurvey.survey_end_date = $("#surveyEndDate").val();
//         // var SurveyQuestions = [];
//         var SurveyQuestion = {};
//         SurveyQuestion.question_type = "choice";
//         SurveyQuestion.question_text = $("#surveyQuestion").val();

//         newSurvey.SurveyQuestions.push(SurveyQuestion);
//         // newSurvey.SurveyQuestions1 = SurveyQuestions;
//         // newSurvey.SurveyQuestions[0].SurveyQuestionChoices = [];
//         // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response1").val() });
//         // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response2").val() });
//         // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response3").val() });
//         // newSurvey.SurveyQuestions[0].SurveyQuestionChoices.push({ "choice_text" : $("#response4").val() });

//         console.log(newSurvey);
//         console.log($.fn.jquery);
//         $.ajax({
//             url: "http://localhost:3000/api/user/1/survey",
//             method: "POST",
//             crossDomain: true,
//             data: newSurvey,
//             dataType: 'json',
//         }).done(function(user) {
//             console.log(user);


//             window.location.href = "/survey/1";


//         }).fail(function(xhr, status, error) {
//             console.log(error);
//             window.location.href = "/survey/1";
//         });


//     });

//     $("#submit").on("click", function(){
//         var queryURL = "https://floating-temple-72911.herokuapp.com/api/user/{id}/survey";

//         //Performing AJAX Get request to our queryURl
//         $.ajax({
//             url: queryURL,
//             method: "POST"
//           })

//         // After the data from the AJAX request comes back
//         .done(function(response) {
//             console.log().text(JSON.stringify(
//                 response));

//       });

//     });

// })