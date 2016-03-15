# Goals

* Sunrise
* F.lux

Flux controls the reading light


Sunrise steps:

* Fade to black
* Black to red
* Red to white

What happens if sunrise is happening and you press the button on?
Scenarios:

* You're slightly awake and now you totally want to wake up. Reading lights come on.
* You want to snooze. Long-press

Come home after sunset and turn lights on at switch.
System should detect "new" bulbs and set them appropriately.
Over the course of the evening, the lights continue dimming in preparation for bed.

The primary goal of this project is better sleep.
This is achieved through encouraging sleep and making it easier to get up

There should be some sort of "working late" mode as per F.lux, but that should be the exception.

Alarm
	Knows when to trigger things
	Options
		Respond to parent with the next time it needs to check back
			When it checks back, another delay and a fade
			Parent would then execute fade
		Maintain it's own timers and emit events as needed
			Parent would then call getFade method






# Scene
*An orchestrated fade*
Dynamic lighting.
Sunrise - Active change. Light comes on when previously off.
Flux - Sets the ambient lighting mode.

## Sunrise
A series of steps that goes from darkness to light.
Sunrise only occurs when the lights off. If you're still up, it'll just transition to daylight at the same time anyway.


# Flux
Continuously running.
Should tie in with sunrise alarm or actual sunrise.

Uses sunrise, sunset and sleep preferences to determine color temperature.

734px = 24 hours
30px /hour

One hour transitions between modes

Melbourne
14 hours of sunlight
13 Hours of full day, plus the one hour fade
One hour fade at sunset (occurs at 20:00)
One hour in sunset mode (21:00)
One hour fade to Bedtime (22:00)
A bit under 8 hours of bedtime mode
One hour fade back to daylight

London
9 hours of sunlight
8 hours of full day, plus on hour Fade (7:00)
One hour fade at sunset (16:00)
5.5 hours in sunset mode (17:00)
One hour fade to Bedtime (22:30)
7.5 hours in bedtime mode ()
One hour fade back to daylight

Bedtime mode starts 8.5 hours before bed, with a one hour fade



07:00	128 	(8.5)
15:30	14 		(1)
81 (5.5)
14 (1)
115 (7.5)
16 (1)


## F.lux full cycle
Daytime - Between sunrise and sunset
Sunset - Lights start to orange
Bedtime - Light dims further and becomes a deeper orange. Occurs say, 10 hours before sunrise to make it easier to sleep.
Dawn - Heads towards "sunset", and then "daytime"

## Modes
* Daytime - 6500K
* Sunset - 3400K
* Bedtime - 1900K




# Locale
*Needs a more accurate name, but keeps track of sunrise/sunset times, and potentially daylight savings (if there are timing assumptions that will get messed up by DST)

Knows what time sunrise and sunset are.*



# Globe
*Represents that current state of an individual bulb*

## properties
	id
	name
	hue
	saturation
	brightness
	kelvin

# Fade
*Instruction to change bulb(s)*
What would happen if a fade method started a timer with the same duration as the fade?
This would be handy for sunrise
