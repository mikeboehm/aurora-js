var Light = require('./light.js');

var _ = require('lodash/core');

function LightLibrary() {
	var self = this;
	self.lights = {};

	self.newLight = function(id) {
		var light = new Light(id);
		self.lights[id] = light;

		return self.lights[id];
	}

	self.setLightOnline = function(id) {
		var light = self.getOrCreate(id);
		light.setOnline();
	}

	self.setLightOffline = function(id) {
		var light = self.getOrCreate(id);
		light.setOffline();
	}

	self.lightIsOnline = function(id) {
		var light = self._getLight(id);
		return light ? light.isOnline() : false;
	}

	self.setFade = function(id, fade) {
		var light = self.getOrCreate(id);

		light.setFade(fade);
	}

	self.getFade = function(id) {
		var light = self._getLight(id);

		return light ? light.getFade() : false;
	}

	self.getLightPower = function (lightId) {
		var light = self._getLight(lightId);

		return light ? light.getPower() : true;
	}

	self.setLightPowerOn = function (lightId) {
		self._setLightPower(lightId, true);
	}

	self.setLightPowerOff = function (lightId) {
		self._setLightPower(lightId, false);
	}

	self._setLightPower = function (lightId, powerState) {
		var light = self._getLight(lightId);
		light.setPower(powerState);
	}

	self.getLightPower = function (lightId) {
		var light = self._getLight(lightId);

		return light ? light.getPower() : false;
	}

	self.getOrCreate = function(id) {
		var light = self._getLight(id);
		return light ? light : self.newLight(id);
	}

	self._getLight = function(id) {
		if(
			typeof self.lights[id] != 'undefined'
		) {
			return self.lights[id];
		}
		return false;
	}

	self._setLight = function(light) {
		console.log(light);
		if(typeof self.lights[light.id] != 'undefined') {
			var existing = self._getLight(light.id);
			var light = _.merge(existing, light);

			console.log(light);
		}

		this.lights[light.id] = light;
	}
}

module.exports = LightLibrary;
