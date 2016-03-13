function LifxAdapter(lifx) {
	this.lifx = lifx;

	this.lifx.on('light-new', function(light) {
		console.log('New light: ', light.id);
	});
}

LifxAdapter.prototype.fade = function(fade, lights) {
	console.log('LifxAdapter.prototype.fade');
	var color = fade.getColor();
	var hue = color.hue;
	var saturation = color.saturation;
	var brightness = color.brightness;
	var kelvin = color.kelvin;
	var duration = fade.getDuration();

	for (var lightId in lights) {
		console.log('lightId', lightId);
		this.lifx.light(lightId).color(hue, saturation, brightness, kelvin, duration);
	}
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
