## Files
### index.js
* Instantiates everything
* Basic dependency injection

### controller.js
* Listen to fade events from the Alarm Factory
* Will receive instructions from
	* GlobeManager
	* Light Modes
	* GPIO
	* rest interface

### bulb_manager.js
* Depends on instances of LightAdapter
* Uses Fade Factory
* Will Keep track of bulb states

### lifx_adapter.js
* Adapter for Lifx client

### fade.js
* Instructions for a lighting transition
* Applies to defined groups of bulbs?
* Properties:
	* Brightness: 0-100 or unchanged
	* Hue: 0-360 or unchanged
	* Saturation: 0-100 or unchanged
	* Duration: 0-3600 seconds (60 minutes)
	* Power instruction: On, off, unchanged

### fade_factory.js


## Roadmap
### Light comes online
* LifxAdapter detects new bulb
* emits an event for the GlobeManager
* GlobeManager persists light and emits an event for the controller
* Controller determines what state the bulbs should be in

### Lighting Mode (Sunrise, Flux)
* A series of Fades
* Triggers change of lights

### Alarm
* Alarm emits named events and durations
* For the sake of clarity, this is surfaced to the user as a Group
* nextEvent()
* handle('prefade')

- Knows about the stages
- Emits event to tell controller to ask for fades
- Has a method to provide fades for supplied lights


### Sunrise
*A sequence of fades. Can include a prefade?*
* Optional: reset initial color (leave power mode unchanged)
* Dawn: Black to red
* Sunrise: Red to white
* Day: Turn off after a while

prefade: black
dawn: red
sunrise: white
day: sunrise


### Time for sunrise
* A timed callback fires for the Controller
* The callback tells the controller whether to ask Alarm or Flux for lightIds provided when the timer was set
* Controller asks Alarm for fade and sets next timer
One option for catchup fades is to have an additional callback timer. In the case of settings being refreshed, it should be safe to clear all timers since they will be set again by the refresh.


### Controller reacts to new bulb
* Controller provides Alarm with lightId
* Alarm checks time and for a matching Id and generates a custom fade to cause it to match current state of siblings
* Also provides subsequent fade to provide velocity to match its siblings
* Basically, if a light appears during a sunrise, it needs to go from whatever color state it was last in, and then change rapidly to match the current color of its siblings. Since the siblings are in a state of flux, that bulb needs to be set on that course too.
