var LifxAdapter = require('../lifx_adapter');
var LightLibrary = require('../light_library');

const EventEmitter = require('events');
const util = require('util');

function MockLifxClient () {
}

util.inherits(MockLifxClient, EventEmitter);
mockLifxClient = new MockLifxClient();

lightLibrary = new LightLibrary();

describe("LifxAdapter object", function () {
	var lifxAdapter = new LifxAdapter(mockLifxClient);

    it("should be defined", function () {
		expect(LifxAdapter).toBeDefined();
    });
});

describe("Listens to events from Lifx", function() {
	var lifxAdapter = new LifxAdapter(mockLifxClient, lightLibrary);
	it("should listen to events", function () {
		// var lifxAdapter = new LifxAdapter(mockLifxClient, lightLibrary);
		var newListenerCount = mockLifxClient.listeners('light-new').length;
		var offlineListenerCount = mockLifxClient.listeners('light-offline').length;
		var onlineListenerCount = mockLifxClient.listeners('light-online').length;
		expect(newListenerCount).toBe(0);
		expect(offlineListenerCount).toBe(0);
		expect(onlineListenerCount).toBe(0);

		lifxAdapter.init();

		var newListenerCount = mockLifxClient.listeners('light-new').length;
		var offlineListenerCount = mockLifxClient.listeners('light-offline').length;
		var onlineListenerCount = mockLifxClient.listeners('light-online').length;
		expect(newListenerCount).toBe(1);
		expect(offlineListenerCount).toBe(1);
		expect(onlineListenerCount).toBe(1);
	});

	it("record that a light has been discovered", function () {
		// var lifxAdapter = new LifxAdapter(mockLifxClient, lightLibrary);
		spyOn(lightLibrary, 'newLight');
		spyOn(lightLibrary, 'setLightOnline');

		var lightId = 1234;
		lifxAdapter.init();

		mockLifxClient.emit('light-new', {id: lightId});
		expect(lightLibrary.newLight).toHaveBeenCalledWith(lightId);
		expect(lightLibrary.setLightOnline).toHaveBeenCalledWith(lightId);
	});

	it("record that a light has gone offline", function () {
		// var lifxAdapter = new LifxAdapter(mockLifxClient, lightLibrary);
		spyOn(lightLibrary, 'setLightOffline');
		var lightId = 2345;
		lifxAdapter.init();

		mockLifxClient.emit('light-offline', {id: lightId});
		expect(lightLibrary.setLightOffline).toHaveBeenCalledWith(lightId);
	});

	it("record that a light has come online", function () {
		// var lifxAdapter = new LifxAdapter(mockLifxClient, lightLibrary);
		spyOn(lightLibrary, 'setLightOnline');
		var lightId = 3456;
		lifxAdapter.init();

		mockLifxClient.emit('light-online', {id: lightId});
		expect(lightLibrary.setLightOnline).toHaveBeenCalledWith(lightId);
	});
});
