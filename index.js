var lifx = require('lifx');
var http = require("http");

console.log('=== Application started ===');

var SERVER_PORT = 8888;
var SERVER_HOST = '127.0.0.1';
var ENDPOINT_TOGGLE = '/toggle';

var lx = lifx.init();

// GPIO Test
var Gpio = require('onoff').Gpio,
	button = new Gpio(23, 'in', 'rising', {
		debounceTimeout : 1000
	});
console.log('GPIO ready');

function exit() {
    console.log("Exiting...");
    button.unexport();
	lx.close();
	myServer.close();
	process.stdin.pause(); // Command prompt
	process.exit();
}

button.watch(function (err, value) {
    if (err) {
      throw err;
    }
    console.log('button pressed!');
    res = http.get({host:SERVER_HOST,path: ENDPOINT_TOGGLE, port: SERVER_PORT})
    // led.writeSync(value);
});

process.on('SIGINT', exit);

// END GPIO TEST

var stdin = process.openStdin();
process.stdin.setRawMode(true);
process.stdin.resume();

var fadeTime = 0x03E8; // 1000ms

// Listen for keyboard inputs
stdin.on('data', function (key) {
	var day = {
		 hue: 360,
		 saturation: 1,
		 brightness: 1,
		 kelvin: 9000
	}

	var night = {
		hue: 360,
		saturation: 1,
		brightness: 0,
		kelvin: 2500,
		duration: 2
	};

	//process.stdout.write('Got key ' + util.inspect(key) + '\n');
	switch (key[0]) {

		case 0x31: // 1
			console.log("Lights on");
			setLights(night);
			break;

		case 0x32: // 2
			console.log("Lights off");
			setLights(day);
			break;

		case 0x03: // ctrl-c
            exit();
			break;
		}
	}
);

function setLights(fade) {
	var converted = toNodeBulb(fade);
	//		 function(hue,	 sat,	 lum,	 whitecol, timing, bulb)
	lx.lightsColour(converted.hue, converted.saturation, converted.brightness, converted.kelvin, fadeTime);
}

/*
    0xffffff = 65535
    Hue 0 - 359	(The App shows 1 - 360)
    Saturation 0 - 1.0 (I think)
    Brightness 0 - 1.0 (I think)
    Kelvin 2500 - 9000
    (kelvin - minKelvin) / ((maxKelvin - minKelvin)/maxValue)
*/
// Convert from Python version's fade format
function toNodeBulb(fade) {
	var maxValue = 0xffff;
	var minKelvin = 2500;
	var maxKelvin = 9000;
	var maxSaturation = 1;
	var maxBrightness = 1;
	var hueMax = 359.3298237582971;
	
	
	var duration = fade.duration * 1000; // Convert seconds to miliseconds
	if (isNaN(duration)) {
		duration = 0;
	}
	var hue = fade.hue * (hueMax/maxValue);

	// convert/intMax × val
	var saturation = (maxValue/maxSaturation) * fade.saturation;
	var brightness = (maxValue/maxBrightness) * fade.brightness;
	var kelvin = (fade.kelvin - minKelvin) / ((maxKelvin - minKelvin)/maxValue);	
		
	var newFade = {
		duration: duration,
		hue: hue,
		saturation: saturation,
		brightness: brightness,
		kelvin: kelvin
	};
	
// 	console.log(newFade);
	
	return newFade;
}

var off = {
	hue: 0,
	saturation: 0,
	brightness: 0,
	kelvin: 2500,
	duration: 2
};

var on = {
	hue: 0,
	saturation: 0,
	brightness: 1,
	kelvin: 2500,
	duration: 2
}

// HTTP interface
var myServer = http.createServer(function(request, response) {	
	var lightState = true;
	
	switch (request.url) {
		case '/on':
			console.log('on!');
			setLights(on);
			break;
		case '/off':
			console.log('off!');
			setLights(off);
			break;			
        case '/toggle':
			console.log('Toggle!');
			if (this.lightState) {
    			setLights(off);    		    	
    			this.lightState = false;
			} else {
    			setLights(on);
    			this.lightState = true;
			}
			break;			
	}
	
	if (request.method == 'GET') {
		
	}
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
	
}).listen(8888);