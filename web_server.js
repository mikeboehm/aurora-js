var aurora = require('./aurora.js');
var lifx = require('lifx');
var express = require('express');
var app = express();


var lx = lifx.init();
var au = new aurora(lx);

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendfile('public/index.html');
});

app.get('/lights/all/on', function (req, res) {
	console.log('/lights/all/on');
	au.turnOn();
	res.send('');
});

app.get('/lights/all/off', function (req, res) {
	console.log('/lights/all/off');
	au.turnOff();
	res.send('');
});

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening on port ', port);

});
