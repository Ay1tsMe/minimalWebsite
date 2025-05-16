+++
title = "I Fixed an Omni-Directional Wheelchair"
date = 2025-05-16
+++

From Febuarary to May, I've been interning for the Renewable Energy Vehicle (REV) project at the UWA. I was originally tasked to be a helper for the Autonomous Shuttle Bus but due to the job description not involving much engineering, my supervisor had thought my expertise would be more useful elsewhere. So I was relocatted to one of their other projects which had been sitting, collecting dust. This happened to be the Omni-Directional Wheelchair. This is a wheelchair that was designed in 2006 as part of a students honour thesis which can be found [here.](https://robotics.ee.uwa.edu.au/theses/2006-Wheelchair-Woods.pdf) A lot of the specifications are currently outdated but the main functionality remains the same. It is a compact wheelchair capable of supporting up to 100kg of weight, it has custom-built Mecanum wheels that enable movement in any direction including lateral and rotational movements, and it operates fully from two car batteries. By the end of this, you will learn the process of how I got the wheelchair fully functioning and the hurdles I had to overcome along the way.

# What Happened?
Sometime last year, the wheelchair was being used for a demo for new students and it suddenly stopped working. My job was to get this back to its normal operation. I was advised by my supervisor that they had replaced the batteries and all the fuses but it still didnt operate. So, what do we do now?


# Replacing The Microcontroller
On the left armrest of the wheelchair is a box that contains the main internals that control and operate the wheels. The old system was running a [Lilygo T-Display v1.1]() connected to a USB Host Shield designed for an Arduino Uno through a custom PCB. My supervisor instructed me to replace the current system with a new [Lilygo T-Display S3](), that way we wouldn't need the bulky USB Host Shield because the S3 has built in USB Host Mode that we can utilise with the joystick. I already have the Arduino code that was on the original Lilygo, should be an easy fix right?

## WRONG
After multiple weeks of trying to get the T-Display S3 working is USB host mode, I ended up giving up as this had been proven to be more difficult that I thought. In theory, it should just be as simple as uploading USB Host Mode code to the microcontroller and plugging in a device like a keyboard or mouse. But no matter what I did, the usb device that I would plug in just wouldn't connect. I ended up having a long conversation with someone on the Arduino forum and he concluded that from reading the schematic, the reason is wasn't working was because the T-Display S3 was not outputting any voltage through the USB port. They said that there is a schottky diode that blocks the voltage from being sent over the USB port. Other users on the T-Display S3 git repo were also having issues saying they couldn't get USB host mode to work. So what do I do now?
    
# RE-Replacing The Microcontroller
Well if I can't get the new microcontroller working, I guess I'll try and get the old one working instead. The old T-Display v1.1 still had the old Arduino code that was operating the wheelchair. The only problem was, when the joystick was plugged into the USB Host Shield attached to the T-Display, nothing would happen. I tried plugging the joystick into my laptop to see if it came up as a USB device but it didn't appear at all. So I concluded it must be faulty. There happened to be a spare joystick was exactly the same lying around in the lab so I thought if I plug in a working joystick it should work, right? Turns out it didn't. Okay maybe there's something wrong with the USB Host Shield then?

## Diagnosing the USB Host Shield
Because I couldn't get any sort of connected from the USB Host shield with the T-Display v1.1, I decided I should try connect it to a generic ESP32-wroom that I had lying around my house. The USB Host shield that I had on hand happened to have no documentation about it on the internet whatsoever. The closest thing I could find was a [Keyestudio USB Host Shield]() that looked remotely close to what I was using. This was somewhat helpful although I didn't know what each pin was for and there was no printings on the board to specify was each GPIO pin was for. Becuase this board is supposed to be a plug and play replacement for the Arduino Uno, I had to figure out what each pin did but looking at the pinout for the Arduino Uno. My assumption was that this Host shield would be able to work with the [USB Host Shield 2.0 library](). The `README` for the library has instructions on how to wire up an ESP32 with the USB Host shield. 

```
ESP32 is supported using the arduino-esp32
GPIO5 : SS, GPIO17 : INT, GPIO18 : SCK, GPIO19 : MISO, GPIO23 : MOSI
```

After referring to an Arduino Uno's pinout to figure out which pins on the USB Host Shield were what, I was finally able to wire up the board to an ESP32. When I went to ran a quality control test on the board to see if it operates, I was able to pass all the tests... except for the final one. The test got stuck on "Waiting for USB Connection...", even after plugging in multiple devices. So, I guess the USB Host shield is also faulty then.

# So What Now?
Both the joystick and the USB Host shield seem to be faulty so how am I supposed to get the wheelchair operating again. Mind you, my supervisor told me that they would like this wheelchair to be ready in time for Open Day so high school students can see the cool projects that students have been working on over the years. It at this point, Open Day happens to be only in a couple days!!! 
    
## So You're Screwed?
Not exactly. After having at look at the previous code on the wheelchair, it seemed to have some logic to operate it with a PS3 controller. The controller happened to be sitting next to the wheelchair with a label "Omni-Directional Wheelchair". So maybe the controller can connect to the microcontroller. After charging it and turning on the controller for pairing, the display on the microcontroller reacted! The display that is on the microcontroller displays a bitmap of the wheelchair along with 4 number variables that display the value that is being sent to each wheel. If I moved the left analog stick around, the values for each wheel would also change. Although, the wheelchairs wheels were not reacting to this movement. I feel really close now. We just have to get the serial communication between the microcontroller and the Sabertooth and then we will have a functoning wheelchiart. After some diagnosing, it seemed there was a faulty wire between the Sabertooth and the microcontroller, and after replacing that wire, the wheels were now moving!

# Now to bring it back to life
So the wheelchair now partially works. You can operate it using the PS3 controller and all the main functionality is there. However, the joystick and the USB Host Shield still do not work which means you have to sit with a controller on your lap into of using the joystick that is bolted into the right arm rest.

## Replacing The Joystick and USB Host Shield
