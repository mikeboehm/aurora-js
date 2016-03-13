var LifxAdapter = require('../lifx_adapter');

const EventEmitter = require('events');
const util = require('util');

function MockLifxClient () {
}

util.inherits(MockLifxClient, EventEmitter);
mockLifxClient = new MockLifxClient();

describe("LifxAdapter object", function () {
	var lifxAdapter = new LifxAdapter(mockLifxClient);

    it("should be defined", function () {
		expect(LifxAdapter).toBeDefined();
    });
});
