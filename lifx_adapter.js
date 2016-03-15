function LifxAdapter(lifx) {
	this.lifx = lifx;

	this.lifx.on('light-new', function(light) {
		console.log('LifxAdapter.newLight', 'lightId:', light.id);
	});
}

LifxAdapter.prototype.fade = function(fade, lights) {
	console.log('LifxAdapter.fade', 'Event name:', fade.name);
	var color = fade.getColor();
	var hue = color.hue;
	var saturation = color.saturation;
	var brightness = color.brightness;
	var kelvin = color.kelvin;
	var duration = fade.getDuration();
	var powerInstruction = fade.getPower();

	for (var lightId in lights) {
		console.log('LifxAdapter.fade', 'Set color on lightId:', lightId);
		if (powerInstruction == fade.POWER_TURN_ON) {
			this.lightsOn();
		}

		this.lifx.light(lightId).color(hue, saturation, brightness, kelvin, duration);

		if (powerInstruction == fade.POWER_TURN_OFF) {
			this.lightsOff();
		}
	}
}

LifxAdapter.prototype.lightsOn = function() {
	console.log('LifxAdapter.lightsOn');
	var lights = this.lifx.lights();
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		light.on();
		console.log(light.id);
	}
	// this.lifx.lightsOn();
}

LifxAdapter.prototype.lightsOff = function() {
	console.log('LifxAdapter.lightsOff');
	var lights = this.lifx.lights();
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		light.off();
		console.log(light.id);
	}
	// this.lifx.lightsOff();
}

module.exports = LifxAdapter;
