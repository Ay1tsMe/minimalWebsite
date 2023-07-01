+++
title = "Hyprland is the future! (My main desktop workflow)"
date = 2023-07-01
+++

# Ubuntu
Over the past few months, I have tried to switch my main Desktop workflow over to Linux full-time. I had some experimentation with Ubuntu over a year on my laptop but I felt it too bloated and sluggish. As a new Linux user at the time, I was curious as to how people get there desktops looking so nice. I found that in GNOME, users can install plugins to change the way the desktop interface looks. I opted for lots of GNOME plugins that changed the taskbar and colour schemes without realising how inefficient and bloated this method of "ricing" was. My Ubuntu install was now looking cool but at what cost? 

The overall performance of my system had significantly dropped, especially considering I was running this on a Dell XPS 13. The battery life and overall performance seemed to deteriorate a lot faster with these plugins. I had practically turned my stock GNOME experience to a bloated tiling window manager with unnecessary plugins. I wanted to have these cool systems that people were showcasing on r/unixporn, but I was daunted to distro hop and me being an inexperienced Linux user at the time, unsure of what the hurdles I would have to go through to get the experience I wanted.

# A few months ago...
The time had come were I decided to bite the bullet. I wanted to try a tiling window manager on my system and see if I could use it full-time without having to rely on Ubuntu. I searched far and wide and came across all these buzz words such as i3 and dwm but I had no idea what these meant.

A couple weeks pass and I think I have a basic grasp of how the Linux system works at this point. It is then I came across a YouTube video showcasing a new desktop environment which I had not heard before. Hyprland.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lfUWwZqzHmA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Tiling window manager, smooth animations, modern aesthetic. This is exactly what I have been looking for. And it is running on wayland...the future of Linux. I had gone through the trouble of installing Arch on my laptop but I had some difficulties trying to get it to work. It was probably something to do with my inexperience at the time but I decided to just not go through the hassle and instead install another Arch-based distro. I chose EndeavourOS and it has been my main distro of choice for someone who wants to step away from Debian and try something Arch-based.

# The now
As I get comfortable using Hyprland on my laptop, I decided I want to use Windows less and start using Linux on my main desktop computer. I created a github repo of the Hyprland install that I then used to install it on my Desktop PC. I am now running a dual boot of Hyprland and Windows 11. Windows 11 for the occasional video game and Hyprland for everything else. Over the few months I have been daily driving Hyprland, I am very pleased with the experience. My overall productivity has increased mainly due to transitioning from usuing the mouse to more hotkey based operations. I have surprisingly had a very seamless experience that I just did not get on Ubuntu's GNOME desktop environment. I feel I have more control over my system which is what I love about Hyprland/Arch.

# The issues
While Hyprland has been mostly a breeze to set up and use. There is really only one hiccup that I havn't addressed which can be annoying for a select few of users including myself.

### Screensharing
Screensharing has been a pain to use. I believe it is mainly due to the fact Hyprland is using the wayland compositor whereas most programs are designed around X11. Discord screensharing does not work as of writing this. It is a black screen if you share your whole screen. You are able to share applications but it does not stream any audio. There have been some solutions I have come across. One is to use <a href="https://github.com/maltejur/discord-screenaudio" target="_blank">discord-screenaudio.</a> While this is a working solution, it is often tedious to open up another discord client just to share your screen with others. Another solution which is the one I primarily use is <a href="https://screensy.marijn.it" target="_blank">screensy.</a> This solution mostly works and is great to share your screen with others. However, on wayland, audio sharing is still not possible through screensy. This has prompted me to have to reboot back into Windows just to show my friends things on my screen that require audio.

# My current install script for people who care
Linked below is my Hyprland install script that I have customized from SolDoesTech's install script. I have made some additional changes that better suited my needs and might suit yours that I address in the git. My current dotfiles are also linked below if you want the exact configuration that I have.

<a href="https://github.com/Ay1tsMe/Hyprland" target="_blank">Hyprland Install Script</a>

<a href="https://github.com/Ay1tsMe/dotfiles" target="_blank">Current .dotfiles</a>
