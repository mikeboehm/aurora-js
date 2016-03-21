var LifxClient = require('node-lifx').Client;
var LifxAdapter = require('./lifx_adapter');
var BulbManager = require('./bulb_manager');
var SettingsManager = require('./settings');
var Contoller = require('./controller');
var AlarmFactory = require('./alarm_factory');
var FadeFactory = require('./fade_factory');

var lightGroups = {};
var BUTTON_GPIO_PIN = 0;
var AURORA_DEBOUNCE_DELAY = 500;

// Parse Environmental variables
// console.log(process.env);
for (env in process.env) {
	var envNameIsRelevant = env.indexOf('AURORA_') > -1;
	if (envNameIsRelevant) {
		console.log(env, process.env[env]);
	}
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

var client = new LifxClient();
client.init();

var lifxAdapter = new LifxAdapter(client);
var fadeFactory = new FadeFactory();
var bulbManager = new BulbManager(fadeFactory, lifxAdapter, lightGroups);

var settingsManager = new SettingsManager();
var alarmFactory = new AlarmFactory();
var controller = new Contoller(bulbManager, settingsManager, alarmFactory);
controller.init();

if (BUTTON_GPIO_PIN > 0){
	// GPIO listener
	var Gpio = require('onoff').Gpio,
		button = new Gpio(BUTTON_GPIO_PIN, 'in', 'rising', {
			debounceTimeout : DEBOUNCE_DELAY
		});

	button.watch(function(err, value) {
		console.log('index: GPIO button pressed');
		controller.toggle('Bedroom');
	});
	console.log('Index: GPIO ready');
} else {
	console.log('Index: GPIO disabled');
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
