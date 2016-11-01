//server.js file should require the basic npm packages we've used in class: express, body-parser and path.

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();
var PORT = process.env.PORT || 3000;

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//requiring route files to map out the site
require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);

//listener to start 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});