var LifxGlobe = require('./lifx_globe.js');
var colors = require('colors');

function GlobeManager (lifxAdapter) {
	this.globes = {}
	this.lifxAdapter = lifxAdapter;
}

GlobeManager.prototype.lightsOn = function () {
	console.log('GlobeManager.prototype.lightsOn()');
	this.lifxAdapter.lightsOn();
}

GlobeManager.prototype.lightsOff = function () {
	console.log('GlobeManager.prototype.lightsOff()');
	this.lifxAdapter.lightsOff();
}

GlobeManager.prototype.getGlobes = function () {
	return this.globes;
}

GlobeManager.prototype.getGlobeById = function(id) {
	if(this.globes[id]) {
		return this.globes[id];
	} else {
		return this.globes[id];
	}
}

GlobeManager.prototype.updateGlobe = function(globeData) {
	var globe = this.getGlobeById(globeData.id);
	if(globe) {
		globe.update(globeData);

		this.globes[globeData.id] = globe;
	} else {
		this.globes[id] = new LifxGlobe(globeData);
	}
}

module.exports = GlobeManager;
