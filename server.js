var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var log4js = require("log4js");

var logger = log4js.getLogger();
logger.level = "debug";

var PORT = process.env.PORT || 3000;

var app = express();

// Override with POST having ?_method=PUT and ?_method=DELETE
app.use(methodOverride("_method"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var apiRoutes = require("./controllers/user_api_routes.js")(app);
var apiRoutes = require("./controllers/survey_api_routes.js")(app);
var htmlRoutes = require("./controllers/html_routes.js")(app);

// app.use(apiRoutes);
// app.use(htmlRoutes);

app.listen(PORT, function() {
    logger.debug("Survey Squid now listening on port :" + PORT);
});