var Alarm = require('./alarm');

const EventEmitter = require('events');
const util = require('util');
var moment = require('moment');



function AlarmFactory (lights) {
	this.lights = lights;
	this.alarm = {};
	this.timer = setTimeout(function(){}, 0);
	EventEmitter.call(this);
}

util.inherits(AlarmFactory, EventEmitter);

AlarmFactory.prototype.init = function() {
	this.alarm = this.getNextAlarm();
}


AlarmFactory.prototype.getNextAlarm = function () {
	var alarmTime = this.getNextAlarmTime();
	return this.newAlarm(alarmTime);
}

// Emit a fade trigger event
AlarmFactory.prototype.triggerFade = function (eventName, duration) {
	this.emit('fade', {name: eventName, duration: duration});
};

// Time till moment event in milliseconds
AlarmFactory.prototype.msUntilMoment = function (momentObject) {
	return momentObject.diff(moment());
};

// Set timer for next event trigger
AlarmFactory.prototype.setTimer = function (eventName, duration, delay) {
	clearTimeout(this.timer);

	this.timer = setTimeout(this.triggerFade, delay, eventName, duration);
};

// Gets next alarm event
// Updates alarm if necessary
AlarmFactory.prototype.getNextTimer = function () {
	var now = moment();
	var nextEvent = this.alarm.getNextEvent(now);

	// TODO Get and set next alarm if no more events for this timer
	if(nextEvent == false) {
		this.alarm = this.getNextAlarm();
		nextEvent = this.alarm.getNextEvent(now);
	}

	var delay = this.msUntilMoment(nextEvent.time);

	this.setTimer(nextEvent['name'], nextEvent['duration'], delay);
};


// Factory method for Alarm
AlarmFactory.prototype.newAlarm = function(alarmTime) {
	var alarm = new Alarm(alarmTime);

	// TODO Alarm shouldn't know about lights
	alarm.setLights(this.lights);

	return alarm;
}

// Returns MomentJS
AlarmFactory.prototype.getNextAlarmTime = function() {
	var now = moment();
	var todayAlarmTime = this.getAlarmTimeForDayNumber(now.day());

	var alarmTime = moment()
		.hours(todayAlarmTime.hours)
		.minutes(todayAlarmTime.minutes)
		.seconds(0);

	var alarm = this.newAlarm(alarmTime);

	// Get tomorrow's if there are no remaining events for the today's alarm
	if (alarm.getNextEvent() == false) {
		alarmTime.add(1, 'day');

		var tomorrowAlarmTime = this.getAlarmTimeForDayNumber(alarmTime.day());
		alarmTime.hours(tomorrowAlarmTime.hours)
			.minutes(tomorrowAlarmTime.minutes);
	}

	return alarmTime;
}

// TODO use settings
AlarmFactory.prototype.getAlarmTimeForDayNumber = function(dayNumber) {
	if(dayNumber == 0 || dayNumber == 6) {
		// Weekends
		return {'hours': 9, 'minutes': 0};
	} else {
		// Weekdays
		return {'hours': 7, 'minutes': 0};
	}
}

module.exports = AlarmFactory;
