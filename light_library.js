var _ = require('lodash/core');

function LightLibrary() {
	var self = this;
	self.lights = {};

	self.newLight = function(id) {
		return {
			id: id,
			online: false,
			fade: {},
			power: false
		};
	}

	self._getLight = function(id) {
		if(
			typeof id != 'undefined'
			&& typeof self.lights[id] == 'undefined'
		) {
			var light = self.newLight(id);
			self._setLight(light);
		}
		return self.lights[id];
	}

	self._setLight = function(light) {
		if(typeof self.lights[light.id] != 'undefined') {
			var existing = self._getLight(light.id);
			var light = _.merge(existing, light);

			console.log(light);
		}

		this.lights[light.id] = light;
	}
}

module.exports = LightLibrary;
