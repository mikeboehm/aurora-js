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
			this.lightsOn([lightId]);
		}

		this.lifx.light(lightId).color(hue, saturation, brightness, kelvin, duration);

		if (powerInstruction == fade.POWER_TURN_OFF) {
			this.lightsOff([lightId]);
		}
	}
}

LifxAdapter.prototype.lightsOn = function(lights) {
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		console.log('LifxAdapter.lightsOn', lightId);
		this.lifx.light(lightId).on(100);
	}
}

LifxAdapter.prototype.lightsOff = function(lights) {
	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		console.log('LifxAdapter.lightsOff', lightId);
		this.lifx.light(lightId).off(100);
	}
}

module.exports = LifxAdapter;
