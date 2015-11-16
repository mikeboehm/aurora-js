var Sunrise = require('sunrise-node');
var SunriseAdapter = require('./sunrise-adapter.js');
// var Aurora = require('./aurora.js');
var Settings = require('./settings.js');
var Flux = require('./flux.js');
var Alarm = require('./alarm_mode.js');
var Aurora = require('./aurora.js');

var LightsAdapter = require('./node_lifx_adapter.js');
var LifxClient = require('node-lifx').Client;



var client = new LifxClient();
client.init();

var lightsAdapter = new LightsAdapter(client);
var alarm = new Alarm();
var aurora = new Aurora(lightsAdapter, alarm);

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
