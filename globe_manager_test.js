var colors = require('colors');
var LightsAdapter = require('./node_lifx_adapter.js');
var LifxClient = require('node-lifx').Client;

var GlobeManager = require('./globe_manager.js');

var client = new LifxClient();
client.init();

var globeManager = new GlobeManager();

var updater = setInterval(function() {
	var globes = globeManager.getGlobes();
	for (var globeId in globes) {
		var d = new Date();
		console.log(globeId, d.getSeconds(), d.getMilliseconds());
		client.light(globeId).getState(function(error, data) {
	        if (data) {
				var d = new Date();
				console.log(globeId, d.getSeconds(), d.getMilliseconds());

				data.id = this;
	            globeManager.updateGlobe(data);
	        }
	    }.bind(globeId));
	}
}, 5 * 1000);

client.on('light-new', function(light){
	globeManager.updateGlobe(light);
});

client.on('light-online', function(light){
	console.log('light online:', light.id);
});

client.on('light-offline', function(light){
	console.log('light offline:', light.id);
});
