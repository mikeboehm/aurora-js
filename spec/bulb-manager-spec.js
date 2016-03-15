var BulbManager = require('../bulb_manager');

describe("BulbManager object", function () {
	var bulbManager = new BulbManager();

    it("should be defined", function () {
		expect(BulbManager).toBeDefined();
    });
});

describe("Get lights for fade", function() {
	// TODO write better test for this
	var bulbManager = new BulbManager();
	it("for one group", function(){
		var groupName = "Bedroom";
		var lights = bulbManager.getLightsForGroup(groupName);

		expect(lights).toEqual(bulbManager.hardCodedBulbs.groups[groupName]);
	});

	it("for multiple groups", function(){
		// TODO write better test for this
		var groupNames = ["Bedroom", "Lounge"];
		var lights = bulbManager.getLightsForGroups(groupNames);

		var count = 0;
		for (light in lights) {
			count++;
		}

		expect(count).toBe(4);
	});
});
