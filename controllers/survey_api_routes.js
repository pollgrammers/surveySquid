// *********************************************************************************
// survey_api_routes.js - this file offers a set of routes for displaying and saving survey data to the db
// *********************************************************************************

var db = require("../models");
var util = require("./util.js")
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
                order: 'survey_start_date ASC'
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
                order: 'survey_start_date ASC'
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
        db.Survey.create(util.surveyReqJsonToDbMapper(req.body), {
            include: [{
                model: db.SurveyQuestion,
                include: [db.SurveyQuestionChoice]
            }]
        }).then(function(newSurvey) {
            res.json(newSurvey);
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
            res.status(500).json({ error });
        });
    });



    // Get survey response summary
    app.get("/api/user/:uid/survey/:sid/response", function(req, res) {
        db.SurveyResponse.query(
            "SELECT survey_id, question_id, choice_id, COUNT(*) FROM survey_response WHERE survey_id = ? GROUP BY s.survey_id , sr.question_id , sr.choice_id ORDER BY s.survey_id , sr.question_id , sr.choice_id ASC", 
            { 
                replacements: [req.params.sid], 
                // type: db.QueryTypes.SELECT 
            }
        ).then(function(surveyResponseSummary) {
            res.json(surveyResponseSummary);
        }).catch(function(error) {
            res.status(500).json({ error });
        });


        // db.SurveyResponse.bulkCreate(
        //     util.submitSurveyReqJsonToDbMapper(req.body, req.params.sid)
        // ).then(function(surveyResponse) {
        //     res.json(surveyResponse);
        // }).catch(function(error) {
        //     res.status(500).json({ error });
        // });
    });

};