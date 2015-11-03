var Settings = require('../settings.js');

describe("Settings manager", function () {
    var settings = new Settings();

    it("should be defined", function () {
        expect(Settings).toBeDefined();
    });

    describe("Location settings", function () {
        it("It should return location settings", function(){
			var locationSettings = settings.location();

            expect(typeof locationSettings != 'undefined').toBe(true);
        });
		it("It should return latitude settings", function(){
			var latitudeSettings = settings.latitude();

			expect(typeof latitudeSettings != 'undefined').toBe(true);
			console.log(latitudeSettings);
			expect(typeof latitudeSettings.degrees == 'number').toBe(true);
			expect(typeof latitudeSettings.minutes == 'number').toBe(true);
			expect(typeof latitudeSettings.seconds == 'number').toBe(true);
		});
		it("It should return longitude settings", function(){
			var longitudeSettings = settings.longitude();

			expect(typeof longitudeSettings != 'undefined').toBe(true);
			expect(typeof longitudeSettings.degrees == 'number').toBe(true);
			expect(typeof longitudeSettings.minutes == 'number').toBe(true);
			expect(typeof longitudeSettings.seconds == 'number').toBe(true);

		});
    });
});
