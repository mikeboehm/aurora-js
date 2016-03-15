/*
 * Adapter for https://github.com/MariusRumpf/node-lifx
 */

var colors = require('colors');
function LifxAdapter(lifx) {
	var that = this;
	this.lifx = lifx;
	this.groups = {};
	var lights = this.lifx.lights();

	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		console.log('############### light ###############');
		console.log(light.id + ' ' + light.label);
		// console.log(light);
		light.getState(function(error, data) {
			console.log('######## light state ########');
			console.log(data);
			console.log('#############################');
		});

		light.getHardwareVersion(function(error, data) {
			console.log('######## light hardware version ########');
			console.log(data);
			console.log('#############################');
		});
		console.log('####################################');
	}
	this.lifx.on('light-new', function(light) {
	  console.log('New light found. ID:' + light.id + ' Label: ' + light.label + ', IP:' + light.address + ':' + light.port);
	//   console.log(light);
	});
	this.lifx.on('message', function(msg, rinfo) {
	  if (typeof msg.type === 'string') {
	    // Known packages send by the lights as broadcast
	    switch (msg.type) {
			case 'stateLocation':
			//   console.log(msg);
			  var lightId = msg.target;
			  var group = msg.location;
			  that.group[group][lightId] = true;

			  console.log(this.group);
			  break;
	      case 'stateGroup':
	      case 'getLocation':
	      case 'stateTemperature':
	      case 'statePower':
			// console.log(msg.type.red);
			// console.log(msg, ' from ' + rinfo.address);
	        break;
	      default:
	        break;
	    }
	  }
	});
}

LifxAdapter.prototype.fade = function(fadeObj) {
	var lights = this.lifx.lights();
	console.log('********** fadeObj *************'.red);
	console.log(fadeObj);
	console.log('********************************'.red);

	var tvBulbId = 'd073d501f660';

	// // red
	// fadeObj = {
	// 	hue: 0,
	// 	saturation: 100,
	// 	brightness: 50,
	// 	kelvin: 2500,
	// 	duration: 1000
	// }

	for (var lightIndex in lights) {
		var light = lights[lightIndex];
		// console.log('############### light ###############');
		// console.log(light.id + ' ' + light.label);
		// // console.log(light);
		// light.getState(function(error, data) {
		// 	console.log(data);
		// });
		//
		// light.getHardwareVersion(function(error, data) {
		// 	console.log(data);
		// });

		if (light.id == tvBulbId) {
			console.log('light found!');
			light.color(fadeObj.hue, fadeObj.saturation, fadeObj.brightness, fadeObj.kelvin, fadeObj.duration);
		}
	}
}

LifxAdapter.prototype.getBulbs = function() {
	return this.lifx.bulbs;
}

module.exports = LifxAdapter;
