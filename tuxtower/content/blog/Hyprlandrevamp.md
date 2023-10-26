+++
title = "Look at this beautfiul rice!"
date = 2023-10-26
+++

{{ resize_image(path="images/blog/rice.jpg", width=600, height=400 op="fit") }}

Over the past couple of days, I've slowly been transitioning my overall Hyprland colour scheme/aesthetic from the Dracula theme to a more dynamic theme that I can change on the fly. The program that has helped me achieve this is `pywal`. My old Dracula theme was nice but after a few months it was time to change it up. Approaching this change, I didn't want to have to adjust all my colour scheme manually across all my programs everytime I wanted something different. Hence `pywal` was the answer. You can check out my old Hyprland setup [here:](@/blog/Hyprland.md)

# pywal
This piece of software enables the user to change the colour scheme of their system based of the colours in a wallpaper. I'm sure plenty of r/unixporn farmers know about this software. It's a great tool that I have now incorporated into Hyprland system. Whenever my wallpaper changes, the colour scheme also changes along with it. From Discord, kitty, waybar, mako, brave and many more programs all change colour schemes whenever my wallpaper is changed. 

<img alt="walset" width="600" src="https://picoshare.tuxtower.net/-QUZTregu34" />

I thought this might be a bit of a challenge as Hyprland runs on the Wayland compositor, and a lot of the system programs that I use are native Wayland apps. Luckily `pywal` supports templates which enables you to apply colour schemes to almost any application on the fly.

<img alt="wofiwallpaper" width="600" src="https://picoshare.tuxtower.net/-v3bFwfeyBE" />

# Plans in the future...
The only part of my setup that is unable to change colour schemes on the fly are programs that use GTK. I'm not sure if this is because I havn't set it up correctly or whether it's just not possible in Wayland at the moment. I saw a solution on this <a href="https://www.schotty.com/Cheatsheets/Pywal_cheatsheet/" target="_blank">Pywal Cheatsheet</a> but I was unable to get this working. This is probably to do with `xresources` on Wayland. If anyone knows a solution, let me know in this <a href="https://github.com/dylanaraps/pywal/issues/718" target="_blank">github issue.</a> In the meantime, my solution has been to step away from GTK applications. I used to use Thunar as my file manager but now I've started using nnn.

# Scripts
Here you can find two of the scripts I use for the colour scheme changing:
- <a href="https://github.com/Ay1tsMe/walset" target="_blank">`walset`</a>: Script to set the wallpaper across my wayland applications
- <a href="https://github.com/Ay1tsMe/wofiwallpaper" target="_blank">`wofiwallpaper`</a>: Script to display my wallpapers in Wofi dmenu mode and then run `walset`
