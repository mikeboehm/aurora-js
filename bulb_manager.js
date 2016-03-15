var FadeFactory = require('./fade_factory');

function BulbManager (fadeFactory, lifxAdapter) {
	this.bulbs = {}
	this.fadeFactory = fadeFactory;
	this.lifxAdapter = lifxAdapter;
	this.hardCodedBulbs = {
		"groups": {
			"Bedroom": [
				"d073d501bd50",	    // bedside
				"d073d5124f57"      // ceiling
			],
			"Lounge": [
				"d073d501f660",	    // booze
				"d073d500ec68"		// couch
			],
		}
	};
}

BulbManager.prototype.fade = function (fadeDetails) {
	var fade = this.fadeFactory.getFadeForEvent(fadeDetails);

	var lights = this.getLightsForGroups(fade.lightGroups);

	this.lifxAdapter.fade(fade, lights);
}

BulbManager.prototype.getLightsForGroups = function(groups) {
	var lightIds = [];

	// TODO do this properly
	for (groupIndex in groups) {
		var groupLights = this.getLightsForGroup(groups[groupIndex]);

		for(lightsIndex in groupLights) {
			var lightId = groupLights[lightsIndex];
			lightIds[lightId] = lightId;
		}
	}

	return lightIds;
}

BulbManager.prototype.getLightsForGroup = function(name) {
	// TODO Implement this properly
	return this.hardCodedBulbs.groups[name];
}

module.exports = BulbManager;
