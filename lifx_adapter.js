function LifxAdapter(lifx) {
	this.lifx = lifx;

	this.lights = {};
}

LifxAdapter.prototype.init = function () {
	this.lifx.on('light-new', function(light) {
		console.log('LifxAdapter.light-new', 'lightId:', light.id);
		this._setLightAsOnline(light.id);
	}.bind(this));

	this.lifx.on('light-offline', function(light) {
		console.log('LifxAdapter.light-offline', 'lightId:', light.id);
		this._setLightAsOffline(light.id);
	}.bind(this));

	this.lifx.on('light-online', function(light) {
		console.log('LifxAdapter.light-online', 'lightId:', light.id);
		this._setLightAsOnline(light.id);
	}.bind(this));
}

LifxAdapter.prototype._setLight = function (lightId, state) {
	this.lights[lightId] = state;
};

LifxAdapter.prototype._getLight = function (lightId) {
	return this.lights[lightId];
};

LifxAdapter.prototype.lightIsOnline = function (lightId) {
	if (typeof this._getLight(lightId) === 'undefined') {
		this._setLight(lightId, false);
	}

	return this._getLight(lightId);
};

LifxAdapter.prototype._setLightAsOnline = function (lightId) {
	console.log('LifxAdapter._setLightAsOnline', lightId);
	this._setLight(lightId, true);
};

LifxAdapter.prototype._setLightAsOffline = function (lightId) {
	console.log('LifxAdapter._setLightAsOffline', lightId);
	this._setLight(lightId, false);
};


LifxAdapter.prototype.fade = function(fade, lights) {
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
		if (this.lightIsOnline(lightId)) {
			console.log('LifxAdapter.fade', 'Set color on lightId:', lightId);
			if (powerInstruction == fade.POWER_TURN_ON) {
				this.lightsOn([lightId]);
			}

			// TODO handle failure
			this.lifx.light(lightId).color(hue, saturation, brightness, kelvin, duration);

			if (powerInstruction == fade.POWER_TURN_OFF) {
				this.lightsOff([lightId]);
			}
		}
	}
}

LifxAdapter.prototype.lightsOn = function(lights) {
	for (var lightIndex in lights) {
		var lightId = lights[lightIndex];
		if (this.lightIsOnline(lightId)) {
			console.log('LifxAdapter.lightsOn', lightId);
			// TODO handle failure
			this.lifx.light(lightId).on(100);
		}
	}
}

LifxAdapter.prototype.lightsOff = function(lights) {
	for (var lightIndex in lights) {
		var lightId = lights[lightIndex];
		if (this.lightIsOnline(lightId)) {
			console.log('LifxAdapter.lightsOff', lightId);
			this.lifx.light(lightId).off(100);
		}
	}
}

module.exports = LifxAdapter;
