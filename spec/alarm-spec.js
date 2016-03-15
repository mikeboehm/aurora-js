var Alarm = require('../alarm.js');

var moment = require('moment');

describe("Alarm object", function () {
	var alarmTime = moment('2016-02-20 07:00:00');
	var alarm = new Alarm(alarmTime);

    it("should be defined", function () {
        expect(Alarm).toBeDefined();
    });
});


describe("get next event", function() {
	var alarmTime = moment('2016-02-20 07:00:00');
	var alarm = new Alarm(alarmTime);

	it("should return false when everything has passed", function(){
		var now = moment('2016-02-20 12:00:00');
		var next = alarm.getNextEvent(now);

		expect(next).toBe(false);
		expect(next.name).not.toBeDefined();
	});

	it("should be predawn before the start", function(){
		var now = moment('2016-02-20 02:00:00');
		var next = alarm.getNextEvent(now);

		expect(next).not.toBe(false);
		expect(next.name).toBe('predawn');
		expect(next.time).toBeDefined();
	});

	it("should be day shutoff at the alarm time", function(){
		var time = moment(alarmTime);
		var next = alarm.getNextEvent(time);

		expect(next).not.toBe(false);
		expect(next.name).toBe('shutoff');
		expect(next.time).toBeDefined();
	});

	it("should return each stage in order", function(){
		var stages = alarm.stages;

		for (stageName in stages) {
			var stage = stages[stageName];

			var next = alarm.getNextEvent(stage.time);

			expect(next.name).toBe(stageName);
		}
	});
});
