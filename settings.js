var Settings = function(){
	this.settings = {
		days: {
			1: {
				alarm: "07:00",
			}
		},
		preferences: {
			sleep_duration: "08:00",
			location: {
				latitude: {
					degrees: 51,
					minutes: 30,
					seconds: 26
				},
				longitude: {
					degrees: 0,
					minutes: 7,
					seconds: 39
				}
			}
		}
	}
}

Settings.prototype.getSettings = function() {
	return this.settings;
}

Settings.prototype.location = function() {
	return this.settings.preferences.location;
}

Settings.prototype.latitude = function() {
	return this.location().latitude;
}

Settings.prototype.setLatitude = function(latitude) {
	return this.location().latitude = latitude;
}

Settings.prototype.longitude = function() {
	return this.location().longitude;
}

module.exports = Settings;
