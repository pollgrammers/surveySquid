var util = {
    surveyReqJsonToDbMapper: function(requestJson) {
        console.log(requestJson);
        var dbJson = {};

        dbJson.user_id = requestJson.user_id;
        dbJson.survey_name = requestJson.survey_name;
        dbJson.survey_desc = requestJson.survey_name;
        dbJson.survey_type = requestJson.survey_type;
        dbJson.survey_start_date = requestJson.survey_start_date;
        dbJson.survey_end_date = requestJson.survey_end_date;
        dbJson.SurveyQuestions = [];

        var question = {};
        var choice = [];
        requestJson.SurveyQuestions.forEach(function(surveyQuestion) {
            question.question_type = surveyQuestion.question_type;
            question.question_text = surveyQuestion.question_text;

            surveyQuestion.SurveyQuestionChoices.forEach(function(surveyQuestionChoice) {
                choice.push(surveyQuestionChoice);
            });

            question.SurveyQuestionChoices = choice;
            dbJson.SurveyQuestions.push(question);
            choice = [];
            question = {};
        });
        return dbJson;
    },
    
    submitSurveyReqJsonToDbMapper: function(requestJson, surveyId) {
        var dbJsonArray = [];
        var dbJson = {};

        requestJson.SurveyQuestions.forEach(function(surveyQuestion) {
            console.log("Respondent user id is " + surveyQuestion.respondent_user_id);
            if(surveyQuestion.respondent_user_id != "" && surveyQuestion.respondent_user_id != null && surveyQuestion.respondent_user_id != undefined){
                dbJson.respondent_user_id = surveyQuestion.respondent_user_id;    
            }
            dbJson.survey_id = surveyId;
            dbJson.question_id = surveyQuestion.question_id;
            dbJson.choice_id = surveyQuestion.choice_id;
            console.log(dbJson);
            dbJsonArray.push(dbJson);
            dbJson = {};
        });

        console.log();
        return dbJsonArray;
    }
}

module.exports = util;