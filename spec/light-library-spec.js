var LightLibrary = require('../light_library');


describe("LightLibrary object", function () {
    it("should be defined", function () {
		var lightLibrary = new LightLibrary();
		expect(LightLibrary).toBeDefined();

    });
});

describe("It looks after Lights", function () {
    it("should be able to create new lights", function () {
		var lightLibrary = new LightLibrary();
        var lightId = '12345';
        var light = lightLibrary.newLight(lightId);
        expect(light.id).toBe(lightId);
    });

    it("can return existing lights", function() {
        var lightLibrary = new LightLibrary();
        var lightId = '23456';
        lightLibrary.newLight(lightId);

        var light = lightLibrary._getLight(lightId);
        expect(light.id).toBe(lightId);
    });

    it("returns false if it can't find an existing light", function() {
        var lightLibrary = new LightLibrary();
        var lightId = 'zzzz';
        var light = lightLibrary._getLight(lightId);
        expect(light).toBe(false);
    });

    it("will safely create a new light when needed", function() {
        var lightLibrary = new LightLibrary();
        var lightId = '34567';
        var light = lightLibrary._getLight(lightId);
        expect(light).toBe(false);
        var light = lightLibrary.getOrCreate(lightId);
        expect(light.id).toBe(lightId);
    });
});

describe("It knows if lights are available", function () {
    it("can set a light as online", function () {
		var lightLibrary = new LightLibrary();
        var lightId = '912873';
        lightLibrary.newLight(lightId);
        lightLibrary.setLightOnline(lightId);
        expect(lightLibrary.lightIsOnline(lightId)).toBe(true);

        lightLibrary.setLightOffline(lightId);
        expect(lightLibrary.lightIsOnline(lightId)).toBe(false);
    });
});

describe("It keeps track of how lights SHOULD be", function () {
    it("knows about power states", function () {
		var lightLibrary = new LightLibrary();
        var lightId = '187263';
        lightLibrary.newLight(lightId);
        lightLibrary.setLightPowerOn(lightId);
        expect(lightLibrary.getLightPower(lightId)).toBe(true);

        lightLibrary.setLightPowerOff(lightId);
        expect(lightLibrary.getLightPower(lightId)).toBe(false);
    });

    it("knows about fades", function () {
        var lightLibrary = new LightLibrary();
        var lightId = '19238';
        // Light doesn't exist yet
        expect(lightLibrary.getFade(lightId)).toBe(false);

        lightLibrary.newLight(lightId);
        var fade = {trousers: 'shorts'};
        lightLibrary.setFade(lightId, fade);
        expect(lightLibrary.getFade(lightId)).toBe(fade);
    });
});
