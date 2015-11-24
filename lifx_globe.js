var colors = require('colors');

function LifxGlobe(id) {
	this.id = id;
	this._ip = '';
	this._label = '';
	this._color = {};
	this._status = false;
	this._power = 1;

}

LifxGlobe.prototype.update = function(globeData) {
	console.log('$$$$$$$$$$$ globe.update()', this.id);
	var that = this;
	var ipAddress = globeData.address;
	if(ipAddress && ipAddress != '0.0.0.0') {
		this.ip(ipAddress);
	}

	var color = globeData.color;
	if(typeof(color) != 'undefined') {
		if(typeof(color) != 'function' && typeof(color.hue) != 'undefined') {
			// console.log('color to be set', color);
			that._color = color;
			that.pants = color;
		}
	}

	var label = globeData.label;
	if (typeof(label) != 'undefined') {
		that._label = label;
	}

	if(typeof(globeData.power) != 'undefined') {
		this._power = globeData.power;
	}
}

LifxGlobe.prototype.status = function(status) {
	if(typeof(status) != 'undefined') {
		if(status == 'on') {
			this._status = true;
		} else {
			this._status = false;
		}
	}
	return this._status;
}

LifxGlobe.prototype.ip = function(ipAddress) {
	if(typeof(ipAddress) != 'undefined') {
		this._ip = ipAddress;
	}
	return this._ip;
}

LifxGlobe.prototype.label = function(label) {
	if(typeof(label) != 'undefined' && label != null) {
		this._label = label;
	}
	return this._label;
}

LifxGlobe.prototype.color = function(color) {
	if(typeof(color) != 'undefined' && color != null) {
		this._color = color;
	}
	return this._color;
}
module.exports = LifxGlobe;
