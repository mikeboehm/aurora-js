function LifxController(){};
LifxController.BASE_URL = 'http://localhost:8080/';
LifxController.color = {'hue': 0, 'saturation': 0, 'brightness': 0};

LifxController.fetch_lights = function() {
	$.getJSON( this.BASE_URL + 'lights.json').done(function( data ) {
// 		console.log(data[0]['color']);
// 		console.log('Light on: ' + data[0]['on']);
        seconds_since_seen = data[0]['seconds_since_seen']
        brightness = data[0]['color']['brightness']
		console.log(String(brightness) + ': ' + String(seconds_since_seen));
		LifxController.set_lights(data[0]['color']);
		LifxController.set_sliders(data[0]['color']);
		LifxController.set_indicator(data[0]['color']);
		LifxController.set_name(data[0]['label']);
	});
}

LifxController.set_name = function(name) {
    $('#light_name').text(name);
}

LifxController.get_lights = function() {
	return this.color;
}

LifxController.toggle = function() {
	var url_suffix = 'lights/all/toggle';
	$.ajax({
		url: this.BASE_URL + url_suffix,
		type: 'PUT'
	})

}

LifxController.set_sliders = function(color) {
// 	console.log(color);
	$('#slider_hue').val(color['hue']);
	$('#slider_saturation').val(color['saturation']);
	$('#slider_brightness').val(color['brightness']);
	$('#slider_kelvin').val(color['kelvin']);
}

LifxController.set_indicator = function(color) {
// 	console.log('set_indicator');
// 	console.log(color);
	new_colour = this.HSVtoRGB(color['hue'], color['saturation'], color['brightness']);
// 	console.log(new_colour);

	new_rgb = 'rgb(' + new_colour['r'] + ', ' + new_colour['g'] + ', ' + new_colour['b'] + ')';

	$('#light_1').css("background-color",new_rgb);
}

LifxController.set_lights = function(color) {
	this.color = color;
}

LifxController.HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

LifxController.update_value = function(property, value) {
	color = this.get_lights();
	color[property] = value;
	color['duration'] = $('#slider_duration').val();
	this.do_light(color);
}

LifxController.do_light = function(color) {
	var url_suffix = 'lights/all/color';
	$.ajax({
		url: this.BASE_URL + url_suffix,
		type: 'PUT',
		data: color
	})
	.done(function( data ) {
		console.log(color);
	});
}

LifxController.setup = function() {
	// Fetch lights
	this.fetch_lights();
	// Get lights
	color = this.get_lights();
	// Set indicator
	// this.set_indicator(color);
	// this.set_sliders(color);
}


$( document ).ready(function() {
	LifxController.setup();


    $('#slider_hue').change(function(){
	   console.log(this.value);
	   LifxController.update_value('hue', this.value);
    });

    $('#slider_saturation').change(function(){
	   console.log(this.value);
	   LifxController.update_value('saturation', this.value);
    });

    $('#slider_brightness').change(function(){
	   console.log(this.value);
	   LifxController.update_value('brightness', this.value);
    });

    $('#slider_kelvin').change(function(){
	   console.log(this.value);
	   LifxController.update_value('kelvin', this.value);
    });

    $('#slider_duration').change(function(){
	   console.log($('#slider_duration').val());
	   console.log(this.value);
// 	   LifxController.update_value('kelvin', this.value);
    });

     $('#toggle').click(function(){
	 	LifxController.toggle();
	 });

     $('#get_lights').click(function(){
	 	LifxController.fetch_lights();
	 });

	 $('#button-turn-on').click(function(){

	 });
});
