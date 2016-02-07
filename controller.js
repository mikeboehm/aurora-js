function Controller(globeManager, settingsManager) {
	this.globeManager = globeManager;
	this.settingsManager = settingsManager;
}

Controller.prototype.init = function() {
	// Setup timers for lighting modes
	console.log('Controller.prototype.init');
}

Controller.prototype.turnOn = function() {
	console.log('Controller.prototype.turnOn');
    this.globeManager.lightsOn();
}

Controller.prototype.turnOff = function() {
	console.log('Controller.prototype.turnOff');
    this.globeManager.lightsOff();
}

module.exports = Controller;
