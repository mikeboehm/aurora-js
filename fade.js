function Fade () {
	this.name = '';
	this.description = '';
	this.hue = 0;
	this.saturation = 0;
	this.brightness = 0;
	this.kelvin = 2500;
	this.duration = 0;
	this.startTime = null;
	// this.lights = [];
	this.lightGroups = [];
}
Fade.prototype.setName = function(name) {
	this.name = name;

	return this;
}

Fade.prototype.setDescription = function(description) {
	this.description = description;

	return this;
}

Fade.prototype.setDuration = function(duration) {
	this.duration = duration;

	return this;
}

Fade.prototype.getDuration = function() {
	return this.duration;
}


Fade.prototype.getColor = function() {
	color = {
		hue: this.hue,
		saturation: this.saturation,
		brightness: this.brightness,
		kelvin: this.kelvin
	};

	return color;
}

Fade.prototype.setHue = function(hue) {
	if(hue < 0) {
		hue = 0;
	} else if (hue > 360) {
		hue = 360;
	}
	this.hue = hue;
}

Fade.prototype.setSaturation = function(saturation) {
	if(saturation < 0) {
		saturation = 0;
	} else if (saturation > 100) {
		saturation = 100;
	}
	this.saturation = saturation;
}

Fade.prototype.setBrightness = function(brightness) {
	if(brightness < 0) {
		brightness = 0;
	} else if (brightness > 100) {
		brightness = 100;
	}
	this.brightness = brightness;
}

Fade.prototype.setKelvin = function(kelvin) {
	if(kelvin < 2500) {
		kelvin = 2500;
	} else if (kelvin > 9000) {
		kelvin = 9000;
	}
	this.kelvin = kelvin;
}

Fade.prototype.setColor = function(color) {
	if('hue' in color) {
		this.setHue(color['hue']);
	}

	if('saturation' in color) {
		this.setSaturation(color['saturation']);
	}

	if('brightness' in color) {
		this.setBrightness(color['brightness']);
	}

	if('kelvin' in color) {
		this.setKelvin(color['kelvin']);
	}

	return this;
}

Fade.prototype.setStartTime = function(startTime) {
	this.startTime = startTime;

	return this;
}

// Fade.prototype.setLights = function(lights) {
// 	this.lights = lights;
// }
//
// Fade.prototype.getLights = function() {
// 	return this.lights;
// }

Fade.prototype.setLightGroups = function(lightGroups) {
	this.lightGroups = lightGroups;
}

Fade.prototype.getLightGroups = function() {
	return this.lightGroups;
}




// var myfade = new Fade();
//
// var color = myfade.getColor();
// console.log(color);

module.exports = Fade;
