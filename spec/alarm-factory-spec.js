var AlarmFactory = require('../alarm_factory.js');

var moment = require('moment');

// var lights = {'12345': {}};

describe("AlarmFactory object", function () {
	var alarmFactory = new AlarmFactory();

    it("should be defined", function () {
        expect(AlarmFactory).toBeDefined();
    });
});

describe("Alarm time for day number", function() {
	var alarmFactory = new AlarmFactory();
	it("should return 9:00 for Weekends", function (){

		var saturdayAlarmTime = alarmFactory.getAlarmTimeForDayNumber(0);
		expect(saturdayAlarmTime.hours).toBe(9);
		expect(saturdayAlarmTime.minutes).toBe(0);

		var sundayAlarmTime = alarmFactory.getAlarmTimeForDayNumber(6);
		expect(sundayAlarmTime.hours).toBe(9);
		expect(sundayAlarmTime.minutes).toBe(0);
	});


	it("should return 7:00 for weekdays", function (){
		for (var dayNumber = 1; dayNumber < 6; dayNumber++) {
			var alarmTime = alarmFactory.getAlarmTimeForDayNumber(dayNumber);
			expect(alarmTime.hours).toBe(7);
			expect(alarmTime.minutes).toBe(0);
		}
	});
});

describe("Next alarm", function() {
	var alarmFactory = new AlarmFactory();
	it("should be in the future", function() {
		var nextAlarmTime = alarmFactory.getNextAlarmTime();
		var now = moment();

		expect(nextAlarmTime).toBeGreaterThan(now);
	});
});

describe("msToMoment", function() {
	var alarmFactory = new AlarmFactory();
	it("should return time to Moment Object in milliseconds", function(){
		var now = moment();
		now.add(1, 'seconds');

		var milliseconds = alarmFactory.msUntilMoment(now);

		// Not sure how to do <=
		expect(milliseconds).toBeLessThan(1001,1);

		// Hard to account for processing time, but shouldn't be lower than this
		expect(milliseconds).toBeGreaterThan(995,1);
	});
});

describe("msToMoment", function() {
	var alarmFactory = new AlarmFactory();
	it("should return time to Moment Object in milliseconds", function(){
		var now = moment();
		now.add(1, 'seconds');

		var milliseconds = alarmFactory.msUntilMoment(now);

		// Not sure how to do <=
		expect(milliseconds).toBeLessThan(1001,1);

		// Hard to account for processing time, but shouldn't be lower than this
		expect(milliseconds).toBeGreaterThan(995,1);
	});
});

describe("getNextTimer", function(){
	var alarmFactory = new AlarmFactory();
	it("should stuff", function(){
		var now = moment();
		var alarm = alarmFactory.newAlarm(now);

		alarmFactory.alarm = alarm;
		var milliseconds = alarmFactory.getNextTimer();
	});
});

describe("Event emitting", function(){
	var alarmFactory = new AlarmFactory();
	it("should emit events", function() {
		var flag = false;
		alarmFactory.on('fade', function(details){
			flag = true;
			expect(details.name).toBe('stage-name');
			expect(details.duration).toBe(1000);
		});

		waitsFor(function() {
			return flag;
	    }, "The event should be emitted", 750);

		alarmFactory.triggerFade('stage-name', 1000);
	});
});
