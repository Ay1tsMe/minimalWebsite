+++
title = "Using stow to manage my dotfiles"
date = 2025-02-22
+++

# "What is `stow`?"
`stow` is a GNU program that manages symlinks across your system. It is especially useful for managing dotfiles system-wide across multiple devices. You simply run `stow` on the file and it will create a symlink to your desired location. Over the past month, I have been slowly migrating my dotfiles to be managed by `stow`, that way both my laptop and my desktop have the same dotfiles and I don't have to manually manage them anymore.

{{ resize_image(path="images/blog/stow.png", width=1000, height=1200 op="fit") }}

# How does it work?
The basic workflow consists of the following:
1. Create a git with all your dotfiles inside
2. Run `stow` on your git repo. (This will symbolic link all your dotfiles to your home directory)
3. ???
4. PROFIT!

You can then download the same git repo on your other devices and run `stow` to symlink the dots to that devices home directory. Whenever you edit a dotfile, all you have to do is `git add` and `git push` the change and it will automatically synchronise your dotfiles on all your other devices when you `git pull` the changes. 

This saves you a ton of effort. Normally you would have to manually overwrite your home directory dotfiles with the dotfiles in the git repo everytime there is a change or manually write `ln -s` for every dotfile you have. Whereas with `stow` these hassles are eliminated.

{{ resize_image(path="images/blog/stowwojak.jpg", width=400, height=600 op="fit") }}

# How do I do this myself?

[Here](https://github.com/Ay1tsMe/pywaldotfiles) is an example of my current dotfiles using `stow`. For every dotfile you have, you create a 'package' folder for `stow` to recognise, then in that 'package' folder, you would mimic the folder structure that the dotfiles have in your home directory. `stow` will read the contents of each 'package' and place it in your home directory.

## Example 1

If you want to add the dotfiles for waybar which is located at `~/.config/waybar`, then in your git repo, you would create a folder structure like this:
```
waybar/.config/waybar
```
where the first folder 'waybar' is the package name and '.config/waybar' is the path it will have in your home directory.

## Example 2

If you want to add `.zshrc` to your dotfiles, you would create the following folder structure in the git repo:
```
zsh/.zshrc
```
where the first folder 'zsh' is the package name and `.zshrc` is the dotfile in your package folder.

## Creating the makefile

To make things easier, you can create a `make` file in the git repo that contains the following:
```
all:
	stow --verbose --target=$$HOME --restow */
delete:
	stow --verbose --target=$$HOME --delete */
```

Now when you run `make` in the repo, it will `stow` all the packages you have created to the home directory. You can also run `make delete` to remove the symbolic links from the home directory. 

`stow` also requires the target location to not exist. So if you already have the same filename or folder in your home directory as one that is in your dotfiles git repo, then `stow` will not create a symbolic link. You need to backup and remove your previous dotfile for `stow` to proceed.

