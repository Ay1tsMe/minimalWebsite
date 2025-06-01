+++
title = "I Fixed an Omni-Directional Wheelchair"
date = 2025-05-16
+++

[Insert image of wheelchair original]

From Febuarary to May, I've been interning for the Renewable Energy Vehicle (REV) project at the UWA. I was originally tasked to be a helper for the Autonomous Shuttle Bus but due to the job description not involving much engineering, my supervisor had thought my expertise would be more useful elsewhere. So I was relocatted to one of their other projects which had been sitting, collecting dust. This happened to be the Omni-Directional Wheelchair. This is a wheelchair that was designed in 2006 as part of a students honour thesis which can be found [here.](https://robotics.ee.uwa.edu.au/theses/2006-Wheelchair-Woods.pdf) A lot of the specifications are currently outdated but the main functionality remains the same. It is a compact wheelchair capable of supporting up to 100kg of weight, it has custom-built Mecanum wheels that enable movement in any direction including lateral and rotational movements, and it operates fully from two car batteries. By the end of this, you will learn the process of how I got the wheelchair fully functioning and the hurdles I had to overcome along the way.

# What Happened?
Sometime last year, the wheelchair was being used for a demo for new students and it suddenly stopped working. My job was to get this back to its normal operation. I was advised by my supervisor that they had replaced the batteries and all the fuses but it still didnt operate. So, what do we do now?

# Replacing The Microcontroller
On the left armrest of the wheelchair is a box that contains the main internals that control and operate the wheels. The old system was running a [Lilygo T-Display v1.1](https://github.com/Xinyuan-LilyGO/TTGO-T-Display) connected to a USB Host Shield designed for an Arduino Uno through a custom PCB. My supervisor instructed me to replace the current system with a new [Lilygo T-Display S3](https://github.com/Xinyuan-LilyGO/T-Display-S3), that way we wouldn't need the bulky USB Host Shield because the S3 has built in USB Host Mode that we can utilise with the joystick. I already have the Arduino code that was on the original Lilygo, should be an easy fix right?

[Insert image of both microcontrollers together]

## Somehow not an easy fix...
After multiple weeks of trying to get the T-Display S3 working is USB host mode, I ended up giving up as this had been proven to be more difficult that I thought. In theory, it should just be as simple as uploading USB Host Mode code to the microcontroller and plugging in a device like a keyboard or mouse. But no matter what I did, the usb device that I would plug in just wouldn't connect. I ended up having a long conversation with someone on the Arduino forum and he concluded that from reading the schematic, the reason is wasn't working was because the T-Display S3 was not outputting any voltage through the USB port. They said that there is a schottky diode that blocks the voltage from being sent over the USB port. Other users on the T-Display S3 git repo were also having issues saying they couldn't get USB host mode to work. So what do I do now?

    
# RE-Replacing The Microcontroller
Well if I can't get the new microcontroller working, I guess I'll try and get the old one working instead. The old T-Display v1.1 still had the old Arduino code that was operating the wheelchair. The only problem was, when the joystick was plugged into the USB Host Shield attached to the T-Display, nothing would happen. I tried plugging the joystick into my laptop to see if it came up as a USB device but it didn't appear at all. So I concluded it must be faulty. There happened to be a spare joystick was exactly the same lying around in the lab so I thought if I plug in a working joystick it should work, right? Turns out it didn't. Okay maybe there's something wrong with the USB Host Shield then?

## Diagnosing the USB Host Shield
Because I couldn't get any sort of connected from the USB Host shield with the T-Display v1.1, I decided I should try connect it to a generic ESP32-wroom that I had lying around my house. The USB Host shield that I had on hand happened to have no documentation about it on the internet whatsoever. The closest thing I could find was a [Keyestudio USB Host Shield](https://wiki.keyestudio.com/Ks0155_keyestudio_USB_Host_v1.5_shield) that looked remotely close to what I was using. 

[Insert USB Host Shield here]

This was somewhat helpful although I didn't know what each pin was for and there was no printings on the board to specify was each GPIO pin was for. Becuase this board is supposed to be a plug and play replacement for the Arduino Uno, I had to figure out what each pin did but looking at the pinout for the Arduino Uno. My assumption was that this Host shield would be able to work with the [USB Host Shield 2.0 library](https://github.com/felis/USB_Host_Shield_2.0). The `README` for the library has instructions on how to wire up an ESP32 with the USB Host shield. 

```
ESP32 is supported using the arduino-esp32
GPIO5 : SS, GPIO17 : INT, GPIO18 : SCK, GPIO19 : MISO, GPIO23 : MOSI
```

After referring to an Arduino Uno's pinout to figure out which pins on the USB Host Shield were what, I was finally able to wire up the board to an ESP32. When I went to ran a quality control test on the board to see if it operates, I was able to pass all the tests... except for the final one. The test got stuck on "Waiting for USB Connection...", even after plugging in multiple devices. So, I guess the USB Host shield is also faulty then.

# JoyStick and USB Host Shield faulty... So What Now?
Both the joystick and the USB Host shield seem to be faulty so how am I supposed to get the wheelchair operating again. Mind you, my supervisor told me that they would like this wheelchair to be ready in time for Open Day so high school students can see the cool projects that students have been working on over the years. It at this point, Open Day happens to be only in a couple days!!! 

[Insert raging man ripping hair]
    
## So You're Screwed? Not exactly...

[Insert ps3 controller]

Not exactly. After having at look at the previous code on the wheelchair, it seemed to have some logic to operate it with a PS3 controller. The controller happened to be sitting next to the wheelchair with a label "Omni-Directional Wheelchair". So maybe the controller can connect to the microcontroller. After charging it and turning on the controller for pairing, the display on the microcontroller reacted! The display that is on the microcontroller displays a bitmap of the wheelchair along with 4 number variables that display the value that is being sent to each wheel. If I moved the left analog stick around, the values for each wheel would also change. Although, the wheelchairs wheels were not reacting to this movement. I feel really close now. We just have to get the serial communication between the microcontroller and the Sabertooth and then we will have a functoning wheelchiart. After some diagnosing, it seemed there was a faulty wire between the Sabertooth and the microcontroller, and after replacing that wire, the wheels were now moving!

[Insert it works wojak]

# Bringing the Wheelchair back to its original working self
So the wheelchair now partially works. You can operate it using the PS3 controller and all the main functionality is there. However, the joystick and the USB Host Shield still do not work which means you have to sit with a controller on your lap instead of using the joystick that is bolted into the right arm rest.

## Replacing the Joystick
A couple weeks pass, and a new replacement joystick arrives for me to replace. The joystick is a Logitech Xtreme 3D Pro. The wheelchair in the past has used different joysticks but the most recent iteration has used this joystick. 

[Insert Logitech joystick]

I unbox the joystick and try to plug it into the USB Host Shield hoping that it would work, but still no luck. What was good news though is that the joystick was able to connect to my laptop and I am able to read the inputs so I know that it works. The previous joystick would not appear on any device no matter what it was plugged into. I inform my supervisor that it could possibly be a faulty USB Host Shield, so we order the part to be replaced. 

## Replacing the USB Host Shield
Shortly after a couple days, the new USB Host Shield arrives. I open its packaging and start to connect it to the ttgo. The ttgo is connected to a blank pcb which has the wiring and header pins to connect the USB Host Shield to the ttgo. I connect all the parts together and plug in the controller excepting it to fully operate as it used did. And to my suprise, the joystick still was still not able to connect to the ttgo. 

At this point, I am dumbfounded. How is this not able to work? My supervisor has told me this worked in the past with these components and wiring so how is it not able to work now? I do a bit of reading with the past history of the wheelchair and I find that it looks like the previous iterations of the joystick functionality have worked over Serial. Looking at the wiring of the blank pcb, it seems that the USB Host Shield has two wires connected to 5v and GND and then two more wires which I assumed are the Serial connections. So my assumption is that the previous protocol that was being used to operate the wheelchair was UART Serial.

[Insert research paper with usb]

Because I didn't know how to get this previous protocol working again, I decided to change it to a more simpler solution and use USB instead. 

### Testing USB Host Library with ESP32
The first step was to see if I can connect a regular ESP32 to the USB Host Shield. I wanted to see if the USB Host Shield 2.0 Library was compatible with the specific board that I was using. I could see from the documentation on the GitHub page that ESP32's were supported which was great news. The docs specify that you can connect it by wiring the ESP32 to the shield using these pins:
```
ESP32 is supported using the arduino-esp32
GPIO5 : SS, GPIO17 : INT, GPIO18 : SCK, GPIO19 : MISO, GPIO23 : MOSI
```
I wired it up according to there docs and loaded up one of there example Arduino sketches that they had in the repo. Convienantly they had an example sketch that was specificaly for my joystick. So I flashed the ESP32 with the `le3dp.ino` sketch and it worked... well, partially. When the ESP32 boots up for the first few seconds, I am able to get input from the joystick perfectly. But then after a few seconds, the serial monitor freezes and I no longer receive any input from the joystick. Here is an example of what was happening:

[Insert image of esp32 wired to shield]

[Insert video of with esp32 problem]

I thought to myself that I could test to see if this issue still happens with the ttgo board or I would have to adjust the wheelchair code to account for the joystick freezing.

### Forking USB Host Library 2.0 to work for ttgo T-Display v1.1
Trying to wire the ttgo to the USB Host Shield came with a bit of a challenge. Because the ttgo has a different pin layout to generic ESP32's, some of the exposed pins were missing for me to use. For example, GPIO5 was not exposed for me to use because it was internally being used for the built-in display.

After doing a bit of research, some user had stated that the SPI pins used to connect external SPI peripherals are the following:
```
#define PIN_MISO  27  // GPIO27
#define PIN_MOSI  26  // GPIO26
#define PIN_SCK   25  // GIPO25
#define PIN_CS    33  // GPIO33

...
SD.begin(PIN_CS, PIN_MOSI, PIN_MISO, PIN_SCK)
```
A more detailed discussion of the thread can be found [here](https://github.com/Xinyuan-LilyGO/TTGO-T-Display/issues/14#issuecomment-584471342).

So now I just need to figure out how to use these pins in the library. Because the libraries GPIO pin configuration for its devices are hard-coded and not modular in your Arduino sketches, I had to fork the library and overwrite the original ESP32 SPI pins with the ttgo's. After doing this, I ran the sample `le3dp.ino` sketch on the ttgo and it worked! Not only did it work, but there was no more freezing on the joystick anymore. I must of had a faulty ESP32 but nonetheless, I am able to read the values of the joystick on the ttgo!

[Insert image of ttgo wired to shield]

The fork of my USB Host Shield 2.0 library can be found [here](https://github.com/Ay1tsMe/USB_Host_Shield_2.0) if you want to connect USB peripherals to your ttgo or you want to see how you can override the hardcoded SPI pins for your ESP32 board.

### Refactoring Wheelchair Arduino Code
Because the old wheelchair Arduino sketch converts the UART Serial input into values that can control and operate the motors, I had to change this logic to use the X, Y and Z received over USB. I used the example Joystick sketch as a base and incorporated it into the wheelchair code. Because most of the previous code had logic to calculate the values needed to be sent to the motors, there was not much work to be done. Here as example of how it works:
```
  // Joystick Variables
  int Xval;   // 0 - 1023
  int Yval;   // 0 - 1023
  int Hat;    // 0 - 15;
  int Twist;  // 0 - 255
  int Slider; // 0 - 255
  int Button; // 0 - 12 (0 = No button)
  
  Usb.Task();                                                    //Use to read joystick input to controller
  JoyEvents.GetValues(Xval, Yval, Hat, Twist, Slider, Button);   //Copies joystick values to user

  // Get joystick values - Convert Joystick values to motor x,y,z values
  if (CONT_MODE == CONT_MODE_JOY) x = Xval;
  if (xdeadmin < x && x < xdeadmax) x = 0;
  else x = mapf(x, xmin, xmax, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_BLU) x = mapf(-cont_y, -100, 100, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_PS3) x = mapf(Ps3.data.analog.stick.lx, -128, 127, -1.0, 1.0);
  if (SQUARE_INPUTS) x *= fabs(x);

  if (CONT_MODE == CONT_MODE_JOY) y = Yval;
  if (ydeadmin < y && y < ydeadmax) y = 0;
  else y = mapf(y, ymin, ymax, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_BLU)y = mapf(cont_x, -100, 100, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_PS3)y = mapf(-Ps3.data.analog.stick.ly, -128, 127, -1.0, 1.0);
  if (SQUARE_INPUTS) y *= fabs(y);

  if (CONT_MODE == CONT_MODE_JOY) z = Twist;
  if (zdeadmin < z && z < zdeadmax) z = 0;
  else z = -mapf(z, zmin, zmax, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_PS3) z = mapf(-Ps3.data.analog.stick.rx, -128, 127, -1.0, 1.0);
  if (CONT_MODE == CONT_MODE_BLU) {
    if (cont_button == 2) {
      z = -1.0;
    } else if (cont_button == 4) {
      z = 1.0;
    } else z = 0;
  }
  if (SQUARE_INPUTS) z *= fabs(z);

  t = Slider;
  if (xdeadmin < t && t < xdeadmax) t = 0;
  else {
    t = mapf(t, tmin, tmax, 0, 1.0);
  }
```

## Joystick Demo

[Insert joystick demo video]

# PIR Sensors

[Insert PIR Sensor here]

## Connecting PIR sensor to ttgo

[Insert video of demo]

## Connecting more than one

[Insert capacitor photo]

## Creating Collision System in Wheelchair Arduino Code

[Insert photo of collission]

## Collision Demo

# Wiring

# Final Result
[Insert file images]

# Git Repo's... If You're Interested
