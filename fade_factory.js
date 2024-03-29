var fadeColors = require('./fade_colors');
var Fade = require('./fade');

function FadeFactory() {
	this.fadeColors = fadeColors;
}

FadeFactory.prototype.getFadeForEvent = function (eventDetails) {
	// { name: 'eventName', duration: 'duration' }
	var eventSettings = this.getEventSettings(eventDetails.name);

	var color = eventSettings.color;
	var lightGroups = eventSettings.lightGroups;
	var duration  = eventDetails.duration;

	var fade = new Fade();

	fade.setName(eventDetails.name);
	fade.setDescription(eventSettings.description);
	fade.setDuration(duration);
	fade.setColor(color);
	fade.setLightGroups(lightGroups);
	fade.setPower(eventSettings.power);

	return fade;
};

FadeFactory.prototype.getEventSettings = function (eventName) {
	return this.fadeColors[eventName];
};

module.exports = FadeFactory;
