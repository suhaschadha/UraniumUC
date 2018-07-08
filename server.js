// Required Modules
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongojs = require('mongojs');
var favicon = require('serve-favicon');

var app = express();

var port = process.env.PORT || 2000;


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app);
require('./app/pharmaroutes')(app);
require('./app/miningroutes')(app);
require('./app/croroutes')(app);
require('./app/fabricationroutes')(app);
require('./app/plantroutes')(app);


app.use(favicon(__dirname + '/public/Images/icon_favicon.ico'));


app.use(morgan("dev"));
//error hadler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
process.on('uncaughtException', function (err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
