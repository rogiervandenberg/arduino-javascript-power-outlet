# Arduino + Javascript controlled Power Outlet
I wanted to toggle my power outlet from a website. Why? Because I can >:) Earlier I made an '[Online Arduino Switch](https://www.youtube.com/watch?v=r7y0IpGhk_w)', but that one was difficult to set up and connect to. The actual webserver was hosted on the Arduino itself and needed an open port to the outside world (router setting) to work.

## This edition
This new version is easier to understand, setup and maintain. This website sets the status for the light to on or off with <a href="http://dweet.io">Dweet.io</a>. The Arduino polls Dweet and switches accordingly. And, this project is open source. The advantages of this setup are:

* The state is stored in Dweet, so even when disconnecting and reconnecting the Arduino, the lights will be set according to the state
* No router configuration needed, the Arduino can connect to the internet and get his state
* The website is hosted on Github, instead of the Arduino, which is **faster**
* Additional controllers, like apps can be added, they only need to push their state to Dweet

## How to setup
### Hardware
You need:

* An Arduino with an internet connection (Arduino with Ethernet shield, Arduino Ethernet, Arduino MKR1000, etc.)
* A relay(board) to switch a high current outlet (230V) with your Arduino. They can be [easily bought online](http://www.dx.com/s/arduino+relay).
* Some soldering, I built this to actually switch my high current appliance:

PHOTO

### A website
Make a website which holds the button, [as I built](https://rogiervandenberg.github.io/arduino-javascript-power-outlet/). [Source for the site can be found here](https://github.com/rogiervandenberg/arduino-javascript-power-outlet/tree/gh-pages).

### Dweet.io
I am using Dweet.io as 'bridge' between my website and Arduino. Dweet is a communication-platform for Internet of Things messaging, the "Twitter for social machines" as they say it :) It doesn't require any setup or sign-up— just publish and go.

### Software
My Arduino uses a simple sketch to poll Dweet.io for the status and updates its pins accordingly to high/low. Make sure you use a unique 'thing-name' for Dweet.io!

## How it works
The website has some javascript that sends [a Dweet](http://dweet.io/follow/arduino-javascript-power-outlet).

My Arduino checks the state of my 'thing' on Dweet and uses that info to set its pin high/low for the relay.

The relay switches the power on/off for the outlet.That way, my 'christmas tree' (or whatever) is controllable through a website.

## Demonstration

VIDEO

## Concerns
All information sent through Dweet.io is public by default. This means anybody can see your light state and update it.

Furthermore, the Arduino is polling, which takes some resources. It would be nicer to use HTTP chunked responses, but the connection will break eventually.