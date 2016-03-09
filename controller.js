function Controller(globeManager, settingsManager, alarmFactory) {
	this.globeManager = globeManager;
	this.settingsManager = settingsManager;
	this.alarmFactory = alarmFactory;

	this.alarmFactory.init();
}

Controller.prototype.init = function() {
	this.alarmFactory.on('fade', function(fadeDetails) {
		console.log('Controller listener');
		this.fade(fadeDetails);
	}.bind(this));
}

// Controller.prototype.turnOn = function() {
// 	console.log('Controller.prototype.turnOn');
//     this.globeManager.lightsOn();
// }
//
// Controller.prototype.turnOff = function() {
// 	console.log('Controller.prototype.turnOff');
//     this.globeManager.lightsOff();
// }

Controller.prototype.fade = function(fadeDetails) {
	console.log('Controller.prototype.fade');
    this.globeManager.fade(fadeDetails);
}

module.exports = Controller;
