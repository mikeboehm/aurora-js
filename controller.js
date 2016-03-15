function Controller(bulbManager, settingsManager, alarmFactory) {
	this.bulbManager = bulbManager;
	this.settingsManager = settingsManager;
	this.alarmFactory = alarmFactory;

	this.alarmFactory.init();
}

Controller.prototype.init = function() {
	this.alarmFactory.on('fade', function(fadeDetails) {
		this.fade(fadeDetails);
	}.bind(this));
}

Controller.prototype.fade = function(fadeDetails) {
    this.bulbManager.fade(fadeDetails);
}

module.exports = Controller;
