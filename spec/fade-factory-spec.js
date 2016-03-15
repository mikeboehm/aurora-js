var FadeFactory = require('../fade_factory');

// var mockBulbManager = {
// 	fade: function(){
// 		console.log('mockBulbManagermockBulbManagermockBulbManager');
// 	}
// };

describe("FadeFactory object", function () {
	var fadeFactory = new FadeFactory();

    it("should be defined", function () {
		expect(FadeFactory).toBeDefined();
    });
});

describe("Gets fade settings", function () {
	var fadeFactory = new FadeFactory();
	it("should get fade settings for event name", function () {
		var eventDetails = { name: 'predawn', duration: 1000 };

		var settings = fadeFactory.getEventSettings(eventDetails.name);

		expect(settings.description).toBeDefined();
		expect(settings.color).toBeDefined();
		expect(settings.lightGroups).toBeDefined();
	});
});

describe("Creates fades", function () {
	var fadeFactory = new FadeFactory();
	it("creates a fade for an event", function () {
		var eventDetails = { name: 'predawn', duration: 1000 };

		var settings = fadeFactory.getEventSettings(eventDetails.name);
		var expectedColor = settings.color;
		var expectedLightGroups = settings.lightGroups;

		var fade = fadeFactory.getFadeForEvent(eventDetails);

		expect(fade.getColor()).toEqual(expectedColor);
		expect(fade.getDuration()).toBe(eventDetails.duration);
		expect(fade.getLightGroups()).toEqual(expectedLightGroups);

	});
});
