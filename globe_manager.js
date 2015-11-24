var LifxGlobe = require('./lifx_globe.js');
var colors = require('colors');

function GlobeManager() {
	this.globes = {}
}

GlobeManager.prototype.getGlobes = function () {
	return this.globes;
}

GlobeManager.prototype.getGlobeById = function(id) {
	if(this.globes[id]) {
		return this.globes[id];
	} else {
		this.globes[id] = new LifxGlobe(id);
		return this.globes[id];
	}
}

GlobeManager.prototype.updateGlobe = function(globeData) {
	var globe = this.getGlobeById(globeData.id);
	if(globe) {
		globe.update(globeData);

		this.globes[globeData.id] = globe;
	}
}

module.exports = GlobeManager;
