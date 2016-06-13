// Model for individual lightsOn
// Used to keep track of the state that they SHOULD be in
// Helps provide robustness when lights go on and offline
function Light(id) {
	var self = this;

	self.id = id;
	self.online = false;
	self.fade = {};
	self.power = false;
	self.group = null;

	self.getPower = function() {
		return self.power;
	};

	self.setPower = function(powerState) {
		self.power = powerState ? true : false;
	}

	self.setFade = function(fade) {
		self.fade = fade ? fade : {};
	}

	self.getFade = function() {
		return self.fade;
	}

	self.isOnline = function() {
		return self.online;
	}

	self.setOnline = function() {
		self.online = true;
	}

	self.setOffline = function() {
		self.online = false;
	}
}

module.exports = Light;
