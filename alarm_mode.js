var util = require('util');
var Moment = require('moment');
var EventEmitter = require('events').EventEmitter;


function AlarmMode() {
	var that = this;
	this.durationSeconds = 60;
	// Halve and convert to milliseconds
	this.duration = this.durationSeconds / 2;
	this.durationMs = this.duration * 1000;
	this.dayDurationSeconds = 60 * 60;
	this.dayDurationMs = this.dayDurationSeconds * 1000;
}

util.inherits(AlarmMode, EventEmitter);

AlarmMode.prototype.setAlarm = function(){
	var that = this;
	var now = new Moment();
	var alarmTime = new Moment().add(this.duration + 60, 'seconds');
	var predawnTime = alarmTime.clone().subtract(this.durationSeconds + 10, 'seconds');
	var dawnTime = alarmTime.clone().subtract(this.durationSeconds, 'seconds');
	var sunriseTime = alarmTime.clone().subtract(this.durationSeconds / 2, 'seconds');

	console.log('now:         '.blue + now.format().blue);
	console.log('predawnTime: '.blue + predawnTime.format().blue);
	console.log('dawnTime:    '.blue + dawnTime.format().blue);
	console.log('sunriseTime: '.blue + sunriseTime.format().blue);
	console.log('alarmTime:   '.blue + alarmTime.format().blue);


	// Predawn countdown
	that.predawnTimer = setTimeout(function() {
			var predawn = that.predawn();
			that.emit('fade', predawn);
		}, predawnTime.format('x') - now.format('x'));

	// Dawn
	that.dawnTimer = setTimeout(function() {
			that.emit('fade', that.dawn());
		}, dawnTime.format('x') - now.format('x'));

	// Sunrise
	that.sunriseTimer = setTimeout(function() {
			that.emit('fade', that.sunrise());
		}, sunriseTime.format('x') - now.format('x'));

	// Day
	that.dayTimer = setTimeout(function() {
			that.emit('fade', that.day());
		}, alarmTime.format('x') - now.format('x'));
}

AlarmMode.prototype.predawn = function() {
	console.log('predawn: '.blue + new Date());
    var fade = {
        hue: 0,
        saturation: 100,
        brightness: 0,
        kelvin: 2500,
        duration: 1000
    }

    return fade;
}

AlarmMode.prototype.dawn = function() {
	console.log('dawn: '.blue + new Date());
    return {
        hue: 0,
        saturation: 100,
        brightness: 100,
        kelvin: 2500,
        duration: this.durationMs / 2
    }
}

AlarmMode.prototype.sunrise = function() {
	console.log('sunrise: '.blue + new Date());
    return {
        hue: 0,
        saturation: 0,
        brightness: 100,
        kelvin: 2500,
        duration: this.durationMs / 2
    }
}

AlarmMode.prototype.day = function() {
	console.log('day: '.blue + new Date());
    return {
        hue: 0,
        saturation: 0,
        brightness: 0,
        kelvin: 9000,
        duration: this.dayDurationMs
    }
}



module.exports = AlarmMode;
