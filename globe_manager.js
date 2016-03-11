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
	console.log('GlobeManager.prototype.fade()');
	var fade = fadeFactory.getFadeForEvent(fadeDetails);

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
// GlobeManager.prototype.lightsOn = function () {
// 	console.log('GlobeManager.prototype.lightsOn()');
// 	this.lifxAdapter.lightsOn();
// }
//
// GlobeManager.prototype.lightsOff = function () {
// 	console.log('GlobeManager.prototype.lightsOff()');
// 	this.lifxAdapter.lightsOff();
// }

// GlobeManager.prototype.getGlobes = function () {
// 	return this.globes;
// }
//
// GlobeManager.prototype.getGlobeById = function(id) {
// 	if(this.globes[id]) {
// 		return this.globes[id];
// 	} else {
// 		return this.globes[id];
// 	}
// }
//
// GlobeManager.prototype.updateGlobe = function(globeData) {
// 	var globe = this.getGlobeById(globeData.id);
// 	if(globe) {
// 		globe.update(globeData);
//
// 		this.globes[globeData.id] = globe;
// 	} else {
// 		this.globes[id] = new LifxGlobe(globeData);
// 	}
// }

module.exports = GlobeManager;
