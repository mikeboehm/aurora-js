var aurora = require('./aurora.js');
// var lifxAdapter = require('./lifx_adapter.js');
var nodeLifxAdapter = require('./node_lifx_adapter.js');
// var lifx = require('lifx');
var LifxClient = require('node-lifx').Client;
var express = require('express');


var client = new LifxClient();
var lights = [];
client.on('light-new', function(light) {
    // Change light state here
    console.log(light.id);
    // lights[light.id] = light;
    // hue           0   360
    // Saturation    0   100
    // brightness    0   100
    // kelvin     2500   900

    var hue = Math.round(Math.random() * 360);
    var saturation = 100;
    var brightness = 100;
    var kelvin = 2500;
    var duration = 1000;

    console.log(hue);

    // light.color(hue, saturation, brightness, kelvin, duration);

    light.color(0, 100, 50);
});

client.init();



var app = express();
// var lx = lifx.init();
// var lightsAdapter = new lifxAdapter(lx);
var lightsAdapter = new nodeLifxAdapter(client);
var au = new aurora(lightsAdapter);

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

app.get('/test/sunrise', function (req, res) {
	console.log('/test/sunrise');
	au.sunrise();
	res.send('');
});

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening on port ', port);

});
