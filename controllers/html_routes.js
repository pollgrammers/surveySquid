// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************


// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    app.get("/:uid/survey", function(req, res) {
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
        db.Survey.findAll(dbSearchObject).then(function(surveyDetails) {
            var hbsObject = {
                surveyDetails: surveyDetails
            };
            res.render("my_survey", hbsObject);
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });

    app.get("/", function(req, res) {
        console.log("Home page request");
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //HTML route for the view and respond to survey page
    app.get("/survey/:sid/respond", function(req, res) {
        db.Survey.findOne({
            where: {
                survey_id: req.params.sid
            },
            include: [{
                    model: db.User,
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
            console.log(surveyDetail);
            if (surveyDetail === null) {
                res.status(404).json({});
            } else {
                var hbsObject = {
                    surveyDetail: surveyDetail
                };
                res.render("submit_survey", hbsObject);
            }
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });


    app.get("/create", function(req, res) {
        console.log("We hit create route!");
        res.sendFile(path.join(__dirname, "../public/createSurvey.html"));
    });

};