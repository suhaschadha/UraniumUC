// Required Modules
var express = require("express");

var bodyParser = require("body-parser");


var app = express();

var port = process.env.PORT || 4000;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
app.get('/', function (req, res) {
    res.send('Hello World do work today!')
  })