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

 // var night = {
 //  hue: 0,
 //  saturation: 65535,
 //  brightness: 0,
 //  kelvin: 2500
 // }
 //
 // var dawn = {
 //  hue: 0,
 //  saturation: 65535,
 //  brightness: 65535,
 //  kelvin: 2500
 // }
 //
 // var sunrise = {
 // hue: 0,
 // saturation: 0,
 // brightness: 65535,
 // kelvin: 2500
 // }
 //
 // var day = {
 // hue: 0,
 // saturation: 65535,
 // brightness: 0,
 // kelvin: 2500
 // }

/*
 * Controls lights based on results from lighting patterns
 *
 * Uses Flux and Aurora to control behaviour of lights
 * Maintains state of Lights
 * Maintains callback timers
 *
 * Toggles lighs based on user input (button being pressed)
 * Sets lights for the appropriate mode
 * Lights have different colors depending on whether they're on or off (brightness changes, hue and others are the same
 * Gets and applies the appropriate end fade
 * Compares current state with desired state to provide a diff
 */
function Aurora(lightsAdapter, alarm) {
    var that = this;

    this.lx = lightsAdapter;
    this.activeMode = alarm;

    this.activeMode.on('fade', function(fade){
            console.log('doing fade');
            that.fader(fade, fade.duration);
        });

    alarm.setAlarm();

    // this.lightsStatus = false;

    // this.modeAdapters.passive = 'flux';
    // this.modeAdapters.active = 'alarm';
}

Aurora.prototype.fader = function(color, duration) {
	console.log('============  fade ============');

	var fade = color;
	fade['duration'] = duration;

	this.lx.fade(fade);
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
