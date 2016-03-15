var Controller = require('../controller');
var AlarmFactory = require('../alarm_factory');
var BulbManager = require('../bulb_manager');

var moment = require('moment');

var lights = {};

describe("Controller object", function () {
	var bulbManager, settingsManager;
	var alarmFactory = new AlarmFactory(lights);

    it("should be defined", function () {
		spyOn(alarmFactory, "init");
		var controller = new Controller(bulbManager, settingsManager, alarmFactory);
		expect(Controller).toBeDefined();
		expect(alarmFactory.init).toHaveBeenCalled();
    });
});

describe("Listens to AlarmFactory", function () {
	var settingsManager;
	var alarmFactory = new AlarmFactory(lights);
	var mockBulbManager = {
		fade: function(){
			console.log('mockBulbManagermockBulbManagermockBulbManager');
		}
	};
	var controller = new Controller(mockBulbManager, settingsManager, alarmFactory);

    it("listen for fade events from AlarmFactory", function () {
		var listenerCount = alarmFactory.listeners('fade').length;
		expect(listenerCount).toBe(0);

		controller.init();

		listenerCount = alarmFactory.listeners('fade').length;
		expect(listenerCount).toBe(1);
    });

	it("calls BulbManager when a fade event is detected", function(){
		spyOn(mockBulbManager, 'fade');
		alarmFactory.triggerFade('eventName', 'duration');

		expect(mockBulbManager.fade).toHaveBeenCalled();
	});
});
