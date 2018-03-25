// *********************************************************************************
// survey_api_routes.js - this file offers a set of routes for displaying and saving survey data to the db
// *********************************************************************************

var db = require("../models");
var util = require("./util.js");
var Sequelize = require('sequelize');
// Routes
// =============================================================
module.exports = function(app) {
    // Get all surveys for a user or searh for user surveys by survey name.
    // To search by survey name use the URI query parm "?search=xyz"
    app.get("/api/user/:uid/survey", function(req, res) {
        var searchString = req.query.search;
        var dbSearchObject = {};
        console.log("Search String: " + searchString);
        if (searchString === null || searchString === undefined) {
            dbSearchObject = {
                include: [{
                    model: db.User,
                    where: {
                        user_id: req.params.uid
                    },
                    attributes: []
                }],
                // order: 'survey_start_date ASC'
            };
        } else {
            dbSearchObject = {
                where: {
                    survey_name: {
                        $like: "%" + searchString + "%"
                    }
                },
                include: [{
                    model: db.User,
                    where: {
                        user_id: req.params.uid
                    },
                    attributes: []
                }],
                // order: 'survey_start_date ASC'
            };
        }

        db.Survey.findAll(dbSearchObject).then(function(surveyDetails) {
            if (surveyDetails === null) {
                res.status(404).json({});
            } else {
                res.json(surveyDetails);
            }
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });



    // Get details for a give survey id
    app.get("/api/user/:uid/survey/:sid", function(req, res) {
        db.Survey.findOne({
            where: {
                survey_id: req.params.sid
            },
            include: [{
                    model: db.User,
                    where: {
                        user_id: req.params.uid
                    },
                    attributes: []
                },
                {
                    model: db.SurveyQuestion,
                    attributes: ["question_id", "question_type", "question_text"],
                    include: [{
                            model: db.SurveyQuestionChoice,
                            attributes: ["choice_id", "choice_text"]
                        }

                    ]
                }
            ]
        }).then(function(surveyDetail) {
            if (surveyDetail === null) {
                res.status(404).json({});
            } else {
                res.json(surveyDetail);
            }
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });



    // Create a new survey
    app.post("/api/user/:uid/survey", function(req, res) {
        console.log("in POST new survey API");
        db.Survey.create(util.surveyReqJsonToDbMapper(req.body), {
            include: [{
                model: db.SurveyQuestion,
                include: [db.SurveyQuestionChoice]
            }]
        }).then(function(newSurvey) {
            newSurvey.survey_url = "https://floating-temple-72911.herokuapp.com/survey/" + newSurvey.survey_id + "/respond";
            res.json(newSurvey.survey_url);
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });



    // Submit a response to a given survey
    app.post("/api/user/:uid/survey/:sid/response", function(req, res) {
        db.SurveyResponse.bulkCreate(
            util.submitSurveyReqJsonToDbMapper(req.body, req.params.sid)
        ).then(function(surveyResponse) {
            res.json(surveyResponse);
        }).catch(function(error) {
            console.log(error);
            res.status(500).json({ error });
        });
    });



    // Get survey response summary
    app.get("/api/user/:uid/survey/:sid/response", function(req, res) {
        // db.sequelize.query(
        //     "SELECT s.survey_id, s.survey_name, s.survey_desc, s.survey_type, s.survey_start_date, s.survey_end_date, sq.question_id, sq.question_type, sq.question_text, sqc.choice_id, sqc.choice_text, sr.choice_count FROM survey s INNER JOIN survey_question sq ON s.survey_id = sq.survey_id INNER JOIN survey_question_choice sqc ON sq.question_id = sqc.question_id LEFT OUTER JOIN (SELECT survey_id, question_id, choice_id, COUNT(*) AS choice_count FROM survey_response WHERE survey_id = :surveyId GROUP BY survey_id , question_id , choice_id ) AS sr ON sr.survey_id = s.survey_id AND sr.question_id = sq.question_id AND sr.choice_id = sqc.choice_id WHERE s.survey_id = :surveyId ORDER BY s.survey_id , sq.question_id , sqc.choice_id ASC", 
        //     { 
        //         replacements: {surveyId: req.params.sid}, 
        //         type: db.sequelize.QueryTypes.SELECT 
        //     }
        // ).then(function(surveyResponseSummary) {
        //     res.json(surveyResponseSummary);
        // }).catch(function(error) {
        //     res.status(500).json({ error });
        // });

        db.Survey.findAll({
            include: [{
                model: db.SurveyQuestion,
                attributes: ["question_id", "question_text"],
                include: [{
                    model: db.SurveyQuestionChoice,
                    // as: "SurveyQuestionChoice",
                    attributes: ["choice_id","choice_text"],
                    include: [{
                        model: db.SurveyResponse,
                        where: Sequelize.where(Sequelize.col("SurveyQuestions->SurveyQuestionChoices->SurveyResponse.question_id"), "=", Sequelize.col("SurveyQuestions.question_id")),
                        where: Sequelize.where(Sequelize.col("SurveyQuestions->SurveyQuestionChoices->SurveyResponse.survey_id"), "=", Sequelize.col("Survey.survey_id")),    
                        attributes: [[Sequelize.fn("COUNT","*"), "choice_count"]],
                        required: false
                    }
                    ]
                }]
            }
            ],
            where:{
                survey_id: req.params.sid
            },
            group: ["Survey.survey_id", "SurveyQuestions.question_id", "SurveyQuestions->SurveyQuestionChoices.choice_id"],
        }).then(function(surveyResponse) {
            res.jsonp(surveyResponse);
        }).catch(function(error) {
            res.status(500).json({ error });
        });

    });

};