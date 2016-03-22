var FadeFactory = require('./fade_factory');

function BulbManager (fadeFactory, lifxAdapter) {
	this.bulbs = {}
	this.groupState = {};
	this.fadeFactory = fadeFactory;
	this.lifxAdapter = lifxAdapter;
	this.hardCodedBulbs = {
		"groups": {
			"Bedroom": [
				"d073d501bd50",	    // bedside
				"d073d5124f57",     // ceiling
				"d073d502061f"    	// Meelah
			],
			"Lounge": [
				"d073d501f660",	    // booze
				"d073d500ec68"		// couch
			],
		}
	};
}

BulbManager.prototype.toggle = function (groupName) {
	console.log('BulbManager.toggle', groupName);
	if (this.lightGroupIsOn(groupName)) {
		this.lightsOff(groupName);
		this.groupState[groupName] = false;
	} else {
		this.lightsOn(groupName);
		this.groupState[groupName] = true;

	}
}

BulbManager.prototype.lightsOn = function(groupName) {
	console.log('BulbManager.lightOn', groupName);
	var lights = this.getLightsForGroup(groupName);
	this.lifxAdapter.lightsOn(lights);
}

BulbManager.prototype.lightsOff = function(groupName) {
	console.log('BulbManager.lightsOff', groupName);
	var lights = this.getLightsForGroup(groupName);
	console.log(lights);
	this.lifxAdapter.lightsOff(lights);
}


BulbManager.prototype.lightGroupIsOn = function(groupName) {
	if (typeof this.groupState[groupName] === "undefined") {
		this.groupState[groupName] = false;
	}
	console.log('BulbManager.lightGroupIsOn', groupName, this.groupState[groupName]);
	return this.groupState[groupName];
}

BulbManager.prototype.fade = function (fadeDetails) {
	var fade = this.fadeFactory.getFadeForEvent(fadeDetails);

	var lights = this.getLightsForMultipleGroups(fade.lightGroups);

	this.lifxAdapter.fade(fade, lights);
}

BulbManager.prototype.getLightsForMultipleGroups = function(groups) {
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
