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

    app.get("/survey/:uid", function(req, res) {
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
            res.render("mysurvey", surveyDetails);
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });

    app.get("/create", function(req, res) {
        console.log("We hit create route!");
        res.sendFile(path.join(__dirname, "../public/createSurvey.html"));
    });

};