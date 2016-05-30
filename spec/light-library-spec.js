var LightLibrary = require('../light_library');


describe("LightLibrary object", function () {
    it("should be defined", function () {
		var lightLibrary = new LightLibrary();
		expect(LightLibrary).toBeDefined();

    });
});

describe("getters and setters", function() {
	var lightLibrary = new LightLibrary();
	it("should add a new empty light when a light doens't exist", function(){
		var lightId = '1234';
		var newLight = lightLibrary.newLight(lightId);
		var missingLight = lightLibrary._getLight(lightId);

		expect(missingLight).toEqual(newLight);
	})
});
