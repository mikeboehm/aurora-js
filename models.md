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

## F.lux full cycle
Daytime - day light
Sunset - Lights start to orange
Bedtime - Light dims further and becomes a deeper orange
Dawn - Heads towards "sunset", and then "daytime"

## Modes
* Daytime - 6500K
* Sunset - 3400K
* Bedtime - 1900K


# Locale
*Needs a more accurate name, but keeps track of sunrise/sunset times, and potentially daylight savings (if there are timing assumptions that will get messed up by DST)

Knows what time sunrise and sunset are.*



# Globe
*Represents that current state of an individual globe*

## properties
	id
	name
	hue
	saturation
	brightness
	kelvin

# Fade
*Instruction to change globe(s)*
What would happen if a fade method started a timer with the same duration as the fade?
This would be handy for sunrise
