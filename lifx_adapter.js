function LifxAdapter(lifx) {
	this.lifx = lifx;
}

LifxAdapter.prototype.lightsOff = function() {
	this.lifx.lightsOff();
}

LifxAdapter.prototype.lightsOn = function() {
    this.lifx.lightsOn();
}


module.exports = LifxAdapter;
