+++
title = "Hyprland is the future! (My main desktop workflow)"
date = 2023-07-01
+++

# Ubuntu
Over the past few months, I have tried to switch my main Desktop workflow over to linux full-time. I had some experimentation with Ubuntu over a year on my laptop but I felt it felt bloated and sluggish. As a new linux user at the time, I was curious as to how people get there desktops looking so nice. I found that in GNOME, users can install plugins to change the way the desktop interface looks. I opted for lots of GNOME plugins without realising how inefficient and bloated this method of "ricing" was. My Ubuntu install was now looking cool but at what cost? 

The overall performance of my system has significantly dropped, especially considering I was running this on a Dell XPS 13. The battery life and overall performance seemed to deteriate. I had pratcically turned my stock GNOME experience to a tiling window manager. I wanted to have these cool systems that people were showcasing on r/unixporn but I was daunted to distro hop and me being an inexperienced linux user at the time, not knowing the hurdles I would have to go through to get the experience I wanted.

# A few months ago...
The time had come were I decided to bite the bullet. I wanted to try a tiling window manager on my system and see if I could use it full-time without having to rely on my Ubuntu OS. I searched far and wide and came across all these buzz words such as i3 and dwm but I had no idea what these meant.

A couple weeks pass and I think I have a basic grasp of how the linux system works at this point. It is then I came across a YouTube video showcasing a new desktop environment which I had not heard before. Hyprland.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lfUWwZqzHmA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Tiling window manager, smooth animations, modern aesthetic. This is exactly what I have been looking for. And it is running on wayland...the future of linux. I go through the trouble of installing Arch on my laptop but I had some trouble trying to get it to work. It probably was something to do with my inexperience at the time but I decided to just not go through the hassle and install another Arch-based distro. I chose EndeauvourOS and it has been my main distro of choice for someone who wants to step from Debian and try something Arch-based.

# The now
As I get comfortable with using Hyprland on my laptop, I decided I want to use Windows less and start using Linux on my main desktop computer. I created a github repo of the Hyprland install that I then used to install it on my Desktop PC. I am now a dual boot of Hyprland and Windows 11. Windows 11 for the occassional video game and Hyprland for everything else.

# The issues
While Hyprland has been mostly a breeze to setup and use. There is really only one hiccup that I havn't addressed which can be annoying for the select few of users including myself.

### Screensharing
Screensharing has been a pain to use. I believe it is mainly due to the fact Hyprland is using the wayland compositor whereas most programs are designed around X11. Discord screensharing does not work as of writing this. It is a black screen if you share your whole screen. You are able to share applications but that do not produce any audio. There have been some solutions I have come across. One is to use <a href="https://github.com/maltejur/discord-screenaudio" target="_blank">discord-screenaudio.</a> While is a working solution, it is often tedious to open up another discord client just to share your screen. Another solution which is the one I primarily use is <a href="https://screensy.marijn.it" target="_blank">screensy.</a> This solution mostly works and is great to share your screen with others. However, on wayland, audio sharing is still not possible. 

# My current install script for people who care
Linked below is my Hyprland install script that I have customized from SolDoesTech's install script. I made some additional changes that better suited my needs and might suit yours that I address in the github. My current .dotfiles are also linked below.

<a href="https://github.com/Ay1tsMe/Hyprland" target="_blank">Hyprland Install Script</a>

<a href="https://github.com/Ay1tsMe/dotfiles" target="_blank">Current .dotfiles</a>
