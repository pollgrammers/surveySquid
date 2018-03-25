// *********************************************************************************
// user_api_routes.js - this file offers a set of routes for displaying and saving user data to the db
// *********************************************************************************

var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
    // Create a new user
    app.post("/api/user", function(req, res) {

        db.User.findOne({
            where: {
                user_email: req.body.user_email
            }
        }).then(function(userDetail) {
            if (userDetail === null) {
                db.User.create({
                    user_email: req.body.user_email,
                    user_fname: req.body.user_fname,
                    user_lname: req.body.user_lname,
                    user_image: req.body.user_image
                }).then(function(newUserDetail) {
                    res.json(newUserDetail);
                }).catch(function(error) {
                    res.status(500).json({ error });
                });
            } else {
                res.json(userDetail);
            }

        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });



    // Get user details
    app.get("/api/user/:uid", function(req, res) {
        db.User.findOne({
            where: {
                user_id: req.params.uid
            }
        }).then(function(userDetail) {
            if (userDetail === null) {
                res.status(404).json({});
            } else {
                res.json(userDetail);
            }

        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });



    // Update user details
    app.put("/api/user/:uid", function(req, res) {
        db.User.update({
            user_email: req.body.user_email,
            user_fname: req.body.user_fname,
            user_lname: req.body.user_lname,
            user_image: req.body.user_image
        }, {
            where: {
                user_id: req.params.uid
            }
        }).then(function(updatedUserCount) {
            if (updatedUserCount[0] === 0) {
                res.status(404).json({})
            } else {
                db.User.findOne({
                    where: {
                        user_id: req.params.uid
                    }
                }).then(function(userDetail) {
                    res.json(userDetail);
                }).catch(function(error) {
                    res.status(500).json({ error });
                });
            }
        }).catch(function(error) {
            res.status(500).json({ error });
        });
    });

};