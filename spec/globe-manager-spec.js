var GlobeManager = require('../globe_manager');

describe("GlobeManager object", function () {
	var globeManager = new GlobeManager();

    it("should be defined", function () {
		expect(GlobeManager).toBeDefined();
    });
});

describe("Get lights for fade", function() {
	// TODO write better test for this
	var globeManager = new GlobeManager();
	it("for one group", function(){
		var groupName = "Bedroom";
		var lights = globeManager.getLightsForGroup(groupName);

		expect(lights).toEqual(globeManager.hardCodedGlobes.groups[groupName]);
	});

	it("for multiple groups", function(){
		// TODO write better test for this
		var groupNames = ["Bedroom", "Lounge"];
		var lights = globeManager.getLightsForGroups(groupNames);

		var count = 0;
		for (light in lights) {
			count++;
		}
		
		expect(count).toBe(4);
	});
});
