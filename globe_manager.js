var LifxGlobe = require('./lifx_globe.js');
var FadeFactory = require('./fade_factory');
var colors = require('colors');

function GlobeManager (fadeFactory, lifxAdapter) {
	this.globes = {}
	this.fadeFactory = fadeFactory;
	this.lifxAdapter = lifxAdapter;
	this.hardCodedGlobes = {
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

GlobeManager.prototype.fade = function (fadeDetails) {
	var fade = this.fadeFactory.getFadeForEvent(fadeDetails);

	var lights = this.getLightsForGroups(fade.lightGroups);

	this.lifxAdapter.fade(fade, lights);
}

GlobeManager.prototype.getLightsForGroups = function(groups) {
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

GlobeManager.prototype.getLightsForGroup = function(name) {
	// TODO Implement this properly
	return this.hardCodedGlobes.groups[name];
}

module.exports = GlobeManager;
