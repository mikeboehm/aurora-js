function LifxController(){
	this.BASE_URL = 'http://localhost:8080';
	this.ENDPOINT_TURNON = '/lights/all/on';
	this.ENDPOINT_TURNOFF = '/lights/all/off';
};

LifxController.prototype.turnOn = function() {
	var url_suffix = this.ENDPOINT_TURNON;
	$.ajax({
		url: this.BASE_URL + url_suffix,
		type: 'GET'
	})
}


LifxController.prototype.turnOff = function() {
	var url_suffix = this.ENDPOINT_TURNOFF;
	$.ajax({
		url: this.BASE_URL + url_suffix,
		type: 'GET'
	})
}

$( document ).ready(function() {
	// LifxController.setup();
	var lifx = new LifxController();
	$('#button-turn-on').click(function(){
		lifx.turnOn();
	});

	$('#button-turn-off').click(function(){
		lifx.turnOff();
	});
});
