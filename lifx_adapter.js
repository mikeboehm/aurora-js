function LifxAdapter(lifx, lightLibrary) {
	var self = this;
	self.lifx = lifx;
	self.lightLibrary = lightLibrary;

	self.lights = {};
	self.lightObjects = {};

	self.init = function () {
		self.lifx.on('light-new', function(light) {
			console.log('LifxAdapter.light-new', 'lightId:', light.id);
			this.lightLibrary.newLight(light.id);
			this.lightLibrary.setLightOnline(light.id);
		}.bind(self));

		this.lifx.on('light-offline', function(light) {
			console.log('LifxAdapter.light-offline', 'lightId:', light.id);
			this.lightLibrary.setLightOffline(light.id);
		}.bind(this));

		this.lifx.on('light-online', function(light) {
			console.log('LifxAdapter.light-online', 'lightId:', light.id);
			this.lightLibrary.setLightOnline(light.id);
		}.bind(this));
	}

	self._setLight = function (lightId, state) {
		this.lights[lightId] = state;
	};

	self._getLight = function (lightId) {
		return this.lights[lightId];
	};

	self.lightIsOnline = function (lightId) {
		return this.lightLibrary.lightIsOnline(lightId);
	};

	self.fade = function(fade, lights) {
		console.log('LifxAdapter.fade', 'Event name:', fade.name);
		var color = fade.getColor();
		var hue = color.hue;
		var saturation = color.saturation;
		var brightness = color.brightness;
		var kelvin = color.kelvin;
		var duration = fade.getDuration();
		var powerInstruction = fade.getPower();

		// TODO refactor this into something neater
		for (var lightId in lights) {
			console.log('LifxAdapter.fade', 'Set color on lightId:', lightId);
			self.lightLibrary.setFade(lightId, fade);

			if (powerInstruction == fade.POWER_TURN_ON) {
				self.lightLibrary.setLightPowerOn(lightId);
				this.lightsOn([lightId]);
			}

			if (this.lightIsOnline(lightId)) {
				// TODO handle failure
				this.lifx.light(lightId).color(hue, saturation, brightness, kelvin, duration);
			}

			if (powerInstruction == fade.POWER_TURN_OFF) {
				self.lightLibrary.setLightPowerOff(lightId);
				this.lightsOff([lightId]);
			}
		}
	}

	// TODO refactor to consolodate with `self.lightsOff()`
	self.lightsOn = function(lights, duration) {
		duration = duration ? duration : 100;

		for (var lightIndex in lights) {
			var lightId = lights[lightIndex];
			self.lightLibrary.setLightPowerOn(lightId);
			if (this.lightIsOnline(lightId)) {
				console.log('LifxAdapter.lightsOn', lightId, duration);
				// TODO handle failure
				this.lifx.light(lightId).on(duration);
			}
		}
	}

	// TODO refactor to consolodate with `self.lightsOn()`
	self.lightsOff = function(lights, duration) {
		duration = duration ? duration : 2500;

		for (var lightIndex in lights) {
			var lightId = lights[lightIndex];
			self.lightLibrary.setLightPowerOff(lightId);
			if (this.lightIsOnline(lightId)) {
				console.log('LifxAdapter.lightsOff', lightId, duration);
				this.lifx.light(lightId).off(duration);
			}
		}
	}
}

// util.inherits(LifxAdapter, EventEmitter);

module.exports = LifxAdapter;
