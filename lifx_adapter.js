function LifxAdapter(lifx) {
	this.lifx = lifx;
}

LifxAdapter.prototype.lightsOn = function() {
	console.log('LifxAdapter.prototype.lightsOn');
	var lights = this.lifx.lights();
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		light.on();
		console.log(light.id);
	}
	// this.lifx.lightsOn();
}

LifxAdapter.prototype.lightsOff = function() {
	console.log('LifxAdapter.prototype.lightsOff');
	var lights = this.lifx.lights();
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		light.off();
		console.log(light.id);
	}
	// this.lifx.lightsOff();
}

module.exports = LifxAdapter;
