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


function Aurora(lightsAdapter) {
    this.lx = lightsAdapter;
}

Aurora.prototype.fade = function() {
	console.log('============  fade ============');
	this.lx.fade();
}

Aurora.prototype.turnOn = function() {
	console.log('============  turnOn: function ============');
    this.lx.lightsOn();
}

Aurora.prototype.turnOff = function() {
	console.log('============  turnOff: function ============');
    this.lx.lightsOff();
}

module.exports = Aurora;
