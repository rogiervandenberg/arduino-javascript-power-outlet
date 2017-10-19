# Arduino + Javascript controlled Power Outlet
I wanted to toggle my power outlet from a website. Why? Because I can >:) Earlier I made an '[Online Arduino Switch](https://www.youtube.com/watch?v=r7y0IpGhk_w)', but that one was difficult to set up and connect to. The actual webserver was hosted on the Arduino itself and needed an open port to the outside world (router setting) to work.

## This edition
This new version is easier to understand, setup and maintain. This website sets the status for the light to on or off using <a href="http://pubnub.com">PubNub</a>. The Arduino listens to the PubNub channel and switches accordingly. And, this project is open source. The advantages of this setup are:

* The state is stored in PubNub, so even when disconnecting and reconnecting the Arduino, the lights will be set according to the state
* No router configuration needed, the Arduino can connect to the internet and get his state
* The website is hosted on Github, instead of the Arduino, which is **faster**
* Additional controllers, like apps can be added, they only need to publish their state to PubNub

## How to setup
### Hardware
You need:

* An Arduino with an internet connection (Arduino with Ethernet shield, Arduino Ethernet, Arduino MKR1000, etc.)
* A relay(board) to switch a high current outlet (230V) with your Arduino. They can be [easily bought online](http://www.dx.com/s/arduino+relay).
* Some soldering, I built this to actually switch my high current appliance:

PHOTO

### A website
Make a website which holds the button, [as I built](https://rogiervandenberg.github.io/arduino-javascript-power-outlet/). [Source for the site can be found here](https://github.com/rogiervandenberg/arduino-javascript-power-outlet/tree/gh-pages).

### PubNub
I am using PubNub as the message broker, or 'bridge', between my website and Arduino. PubNub is a communication-platform for Internet of Things messaging. To use it you need to create a free account and create a new app within your PubNub account. PubNub is free up to 100 devices and 1M messages a month.

A few caveats:

* You need to use the publish/subscribe key of your app, to handle this project from within your own account
* To be able to store the last state of your switch, you need to enable "Storage & Playback". Without it PubNub is just sending the realtime/live messages without remembering anything. So when loading the page you cannot know whether the light is already on or off. With "Storage & Playback" you can look back and find the last state of your switch (was it enabled of disabled the last time?)

### Software
My Arduino uses the [PubNub SDK](https://www.pubnub.com/docs/arduino/pubnub-arduino-sdk) for the status and updates its pins accordingly to high/low.

## How it works
The website has some javascript that Publishes messages to a channel in PubNub.

My Arduino listens for new messages on that channel and uses this info to set its pin high/low for the relay.

The relay switches the power on/off for the outlet.That way, my 'christmas tree' (or whatever) is controllable through a website.

## Other cool things
To make the lights really switchable from wherever, alle instances of the website will switch synchronized. Thus, when opening multiple instances of the website and switching the switch, the switch will update everywhere 8-) This is because the website itself also listens to the PubNub Messages!


## Demonstration

TODO: Add video

## Concerns
The publish and subscribe codes are readable in my code. This means anybody can see the light state and update it.
