var Controller = require('../controller');
var AlarmFactory = require('../alarm_factory');
var GlobeManager = require('../globe_manager');

var moment = require('moment');

var lights = {};

describe("Controller object", function () {
	var globeManager, settingsManager;
	var alarmFactory = new AlarmFactory(lights);

    it("should be defined", function () {
		spyOn(alarmFactory, "init");
		var controller = new Controller(globeManager, settingsManager, alarmFactory);
		expect(Controller).toBeDefined();
		expect(alarmFactory.init).toHaveBeenCalled();
    });
});

describe("Listens to AlarmFactory", function () {
	var settingsManager;
	var alarmFactory = new AlarmFactory(lights);
	var mockGlobeManager = {
		fade: function(){
			console.log('mockGlobeManagermockGlobeManagermockGlobeManager');
		}
	};
	var controller = new Controller(mockGlobeManager, settingsManager, alarmFactory);

    it("listen for fade events from AlarmFactory", function () {
		var listenerCount = alarmFactory.listeners('fade').length;
		expect(listenerCount).toBe(0);

		controller.init();

		listenerCount = alarmFactory.listeners('fade').length;
		expect(listenerCount).toBe(1);
    });

	it("calls GlobeManager when a fade event is detected", function(){
		spyOn(mockGlobeManager, 'fade');
		alarmFactory.triggerFade('eventName', 'duration');

		expect(mockGlobeManager.fade).toHaveBeenCalled();
	});
});
