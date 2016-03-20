var LifxClient = require('node-lifx').Client;
var LifxAdapter = require('./lifx_adapter');
var GlobeManager = require('./bulb_manager');
var SettingsManager = require('./settings');
var Contoller = require('./controller');
var AlarmFactory = require('./alarm_factory');
var FadeFactory = require('./fade_factory');

log('=============================================');
console.log(process.env);
log('=============================================');

var client = new LifxClient();
client.init();

var lifxAdapter = new LifxAdapter(client);
var fadeFactory = new FadeFactory();
var bulbManager = new GlobeManager(fadeFactory, lifxAdapter);

var settingsManager = new SettingsManager();
var alarmFactory = new AlarmFactory();
var controller = new Contoller(bulbManager, settingsManager, alarmFactory);
controller.init();

// GPIO Test
// var Gpio = require('onoff').Gpio,
// 	button = new Gpio(23, 'in', 'rising', {
// 		debounceTimeout : 1000
// 	});
// console.log('GPIO ready');

// var sunriser = new Sunrise();
// var times = sunriser.
//     setDate(new Date()).
//     setLocation({
//         "latitude":{d:latitude.d, m:latitude.m, s:latitude.s},
//         "longitude":{d:longitude.d, m:longitude.m, s:longitude.s}
//     });
//
// times.getTimes();
