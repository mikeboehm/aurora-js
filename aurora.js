var lifx = require('lifx');

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
