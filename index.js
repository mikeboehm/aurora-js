var LifxClient = require('node-lifx').Client;
var LifxAdapter = require('./lifx_adapter');
var GlobeManager = require('./globe_manager');
var Contoller = require('./controller');


var client = new LifxClient();
client.init();

var lifxAdapter = new LifxAdapter(client);

var globeManager = new GlobeManager(lifxAdapter);
var controller = new Contoller(globeManager);
controller.init();

var delayedOff = function (controller) {
	console.log('callback off run');
	controller.turnOff();
}


var delayedSart = function (controller) {
	console.log('callback on run');
	controller.turnOn();
}

setTimeout(delayedOff, 1000, controller);

setTimeout(delayedSart, 3000, controller);

// controller.turnOn();


// var Settings = require('./settings.js');
// var Alarm = require('./alarm_mode.js');
// var Aurora = require('./aurora.js');
//
// var LightsAdapter = require('./node_lifx_adapter.js');
// var LifxClient = require('node-lifx').Client;
//
// var client = new LifxClient();
// client.init();
//
// var lightsAdapter = new LightsAdapter(client);
// var settings = new Settings();
// var alarm = new Alarm(settings);
// var aurora = new Aurora(lightsAdapter, alarm);

// GPIO Test
// var Gpio = require('onoff').Gpio,
// 	button = new Gpio(23, 'in', 'rising', {
// 		debounceTimeout : 1000
// 	});
// console.log('GPIO ready');


// var settings = new Settings();
// var sunriser = new Sunrise();
// var sunriseAdapter = new sunriseAdapter(sunriser, settings);
//
// var flux = new Flux(settings);
//
// console.log(flux.sunset());
//
// var times = sunriser.
//     setDate(new Date()).
//     setLocation({
//         "latitude":{d:latitude.d, m:latitude.m, s:latitude.s},
//         "longitude":{d:longitude.d, m:longitude.m, s:longitude.s}
//     });
//
// times.getTimes();

// var LifxClient = require('node-lifx').Client;
// var lifxClient = new LifxClient();
//
// var LightsAdapter = require('./node_lifx_adapter.js');
// var lightsAdapter = new LightsAdapter(lifxClient);
//
// var flux = new Flux();


// var app = new Aurora();
