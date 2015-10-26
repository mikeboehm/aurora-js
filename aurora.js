// var lifx = require('lifx');

/*
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
*/
//
// var fade = {
//         duration: 2000,
//         hue: 0,
//         saturation: 65535,
//         brightness: 32767,
//         kelvin: 0
//     }
//
//     lx.lightsColour(0, 65535, 32767, 3500, 2000);

// var lx = lifx.init();


/*
 * Saturation: 0x0000 to 0xffff
 *
 */


function Aurora(lx) {

	// var lx = lifx.init();
	console.log('============ CONSTRUCTOR =======================');
	console.log(lx);
	console.log('============ /CONSTRUCTOR =======================');

    this.lifx = lx;
}

Aurora.prototype = {
	fadeOn: function() {
		console.log('============  fadeOn: function ============');
		console.log(this.lifx);
		this.lifx.lightsColour(0, 65535, 32767, 3500, 2000);
	},
	turnOn: function() {
		console.log('============  turnOn: function ============');
	    this.lifx.lightsOn();
		this.getBulbStatus();
	},
	turnOff: function() {
		console.log('============  turnOff: function ============');
		console.log(this.lifx);
	    this.lifx.lightsOff();
		this.getBulbStatus();
	},
	shutdown: function() {
		console.log('Shutting down');
		this.lifx.lightsOff();
		this.lifx.close();
	},
	getBulbStatus: function() {
		console.log('**************** BULB STATUS *****************')
		console.log(this.lifx.requestStatus());
	}
}





// var aurora = new Aurora(lx);

module.exports = Aurora;
