var moment = require('moment');

/*
 * GLOSSARY
 * Predawn - Fade to black in preparation
 * Dawn      is the first appearance of light in the sky before sunrise. The start of the first sequence (black to red)
 * Twilight  is the period between dawn and sunrise
 * Sunrise   is the time in the morning when the sun appears. The start of the second sequence (red to white)
 * Day       occurs once the sunrise sequence is complete
 * Daybreak  could be the term for the event at the end of sunrise?
 */
function Alarm (alarmTime) {
	var dawn = moment(alarmTime);
	dawn.subtract(30, 'minutes');

	var sunrise = moment(alarmTime);
	sunrise.subtract(15, 'minutes');

	var predawn = moment(dawn);
	predawn.subtract(10, 'seconds');

	var shutoff = moment(alarmTime);
	shutoff.add(90, 'minutes');


	this.stages = {
		'predawn': {name: 'predawn', time: predawn, duration: 1000}, // 1 sec
		'dawn': {name: 'dawn', time: dawn, duration: 900000}, // 15 mins
		'sunrise': {name: 'sunrise', time: sunrise, duration: 900000}, // 15 mins
		'shutoff': {name: 'shutoff', time: shutoff, duration: 10000} // 10 secs
	};
}

Alarm.prototype.getNextEvent = function (time) {
	var previous = null;
	for (stageName in this.stages) {
		var stage = this.stages[stageName];
		if (time <= stage.time && (previous == null || previous <= time)) {
			return stage;
		}
	}
	return false;
};

module.exports = Alarm;
