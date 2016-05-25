var LifxClient = require('node-lifx').Client;
var LifxAdapter = require('./lifx_adapter');
var BulbManager = require('./bulb_manager');
var SettingsManager = require('./settings');
var Contoller = require('./controller');
var AlarmFactory = require('./alarm_factory');
var FadeFactory = require('./fade_factory');
// var moment = require('moment');
var moment = require('moment-timezone');
var express = require('express');

// ======== MOCK MOCK LIFX CLIENT
const EventEmitter = require('events');
const util = require('util');

function MockLifxClient () {
}

util.inherits(MockLifxClient, EventEmitter);
mockLifxClient = new MockLifxClient();
// ======== END MOCK LIFX CLIENT

var lightGroups = {};
var BUTTON_GPIO_PIN = 0;
var AURORA_DEBOUNCE_DELAY = 500;
var TIMEZONE = 'etc/UTC';

// Parse Environmental variables
console.log('=========== ENVIRONMENTAL VARIABLES ===========');
for (env in process.env) {
	var envNameIsRelevant = env.indexOf('AURORA_') > -1;
	if (envNameIsRelevant) {
		console.log(env, process.env[env]);
	}
}

if (typeof process.env.AURORA_TZ != "undefined") {
    TIMEZONE = process.env.AURORA_TZ;
}

if (typeof process.env.AURORA_LIGHTS != "undefined") {
    lightGroups = JSON.parse(process.env.AURORA_LIGHTS);
}

if (typeof process.env.AURORA_BUTTON_GPIO_PIN != "undefined") {
    BUTTON_GPIO_PIN = parseInt(process.env.AURORA_BUTTON_GPIO_PIN);
}

if (typeof process.env.AURORA_DEBOUNCE_DELAY != "undefined") {
    DEBOUNCE_DELAY = parseInt(process.env.AURORA_DEBOUNCE_DELAY);
}

console.log('=========== TIMEZONES ===========');
console.log('TIMEZONE', TIMEZONE);
console.log('System', moment().format());
console.log('Timezone', moment().tz(TIMEZONE).format());
console.log('=================================');



var client = new LifxClient();
client.init();

client.on('light-new', function(light) {
	console.log('Index: light-new', 'lightId:', light.id);
});

var lifxAdapter = new LifxAdapter(client);
// var lifxAdapter = new LifxAdapter(mockLifxClient); // Mock Lifx client
lifxAdapter.init();

var fadeFactory = new FadeFactory();
var bulbManager = new BulbManager(fadeFactory, lifxAdapter, lightGroups);

var settingsManager = new SettingsManager();
var alarmFactory = new AlarmFactory(TIMEZONE);
var controller = new Contoller(bulbManager, settingsManager, alarmFactory);
controller.init();


console.log('=========== WEB SERVER ===========');
var app = express();

app.get('/', function (req, res) {
	console.log('root!');
	res.send('Nothing to see here yet. Try <a href="/toggle/Bedroom">/toggle/Bedroom</a>');
});

app.get('/toggle/:group', function (req, res) {
	var group = req.params['group'];
	console.log('Web.toggle:', group);
	controller.toggle(group);
	res.send('');
});

app.listen(3000, function () {
	console.log('Aurora app listening on port 3000!');
});



console.log('=========== GPIO LISTENER ===========');
if (BUTTON_GPIO_PIN > 0){
	// GPIO listener
	var Gpio = require('onoff').Gpio,
		button = new Gpio(BUTTON_GPIO_PIN, 'in', 'rising', {
			debounceTimeout : DEBOUNCE_DELAY
		});

	button.watch(function(err, value) {
		// console.log('index: GPIO button pressed');
		controller.toggle('Bedroom');
	});
	console.log('Index: GPIO ready');
} else {
	console.log('Index: GPIO disabled');
	// console.log('Index: Automatic toggle');
	// setInterval(function(){
	// 	controller.toggle('Bedroom');
	// }, 5000);
}


// var sunriser = new Sunrise();
// var times = sunriser.
//     setDate(new Date()).
//     setLocation({
//         "latitude":{d:latitude.d, m:latitude.m, s:latitude.s},
//         "longitude":{d:longitude.d, m:longitude.m, s:longitude.s}
//     });
//
// times.getTimes();
