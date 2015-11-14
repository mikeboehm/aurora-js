var settings = require('./settings.json');
/**
*
*	Day 0 	Sunday
*	Day 1	Monday
*	Day 2	Tuesday
*/
var Settings = function(){
	this.settings = settings;
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
