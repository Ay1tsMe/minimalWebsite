+++
title = "Building a DIY e-Board (Powered by Liboard)"
date = 2025-10-13
authors = ["Adam Wyatt"]
+++

# Chess

[Image of final product]

Recently I got back into playing chess online. I hadn't played in a few years and when I did, it was mainly casually. I would play a couple games if I was bored and that was that. As I was playing over these past weeks, I've thought to myself if only I could play online chess over the board.

When I was younger, my uncle taught me how to play chess. I learnt the fundamentals and ended up joining my primary school chess club. I loved competing in interschool because it was a way for me to compete over the board. I loved physically picking up the pieces and viewing the game from an over-the-board perspective rather than computer chess which is mainly in a 2D layout. If only there was a way to play on a physical board with people online. That's when I came acros DGT boards

## DGT Boards
A DGT board is an electronic chess board that connect to a computer to record in real-time the inputs made during game play. These boards are often used in tournaments to monitor or broadcast the game. You can connect these boards to websites like [Lichess](https://lichess.org/) to use them as input devices. That way you can play online against other players over a physical board.

The only downside to these boards is that they can cost a lot of money. The cheapest board I could find was a (Bluetooth e-board from DGT)[https://gambitchesssupplies.com.au/22010-dgt-pegasus-bluetooth-online-chess-board/]. But the size of the pieces and the board are much smaller than a tournament style chess board. If you wanted one that is closer to tournament style like this (Wooden Smart Board)[https://gambitchesssupplies.com.au/22023-25008-27011-dgt-usb-smart-board-home-use/], it can cost you almost $900!

## Liboard
I came across this cool project (Liboard)[https://liboard.github.io/] which is a DIY electronic chessboard which uses photoresistors to determine where the pieces are. You can connect the board to Lichess and use it to play games online which is exactly what I want. The project provides a wiring schematic and images of the build along with a materials list. This materials list was significantly cheaper than purchasing a DGT board, with it only costing around $50. So I ordered all the parts from Aliexpress and set out to build it!

## Building the Structure
I opted to build the simplest chess board that was more function over looks. I went to Bunnings and bought the cheapest wood I could get. It cost me a total of $15 for some 3x4's and some plywood. I cut the structure and glued it together. Once the main structure was done, I glued a chess board mat I bought from Aliexpress on the top. And then finally drilled a hole through each square for the photoresistors.

## Wiring
The wiring is fairly straightforward if you have experience with basic soldering skills. It follows a simple matrix wiring structure. I started with placing photoresistors in each of the holes that I drilled. Then I soldered diodes to one end of each photoresistor. Then solder a wire that is connect to each diode for the rows and a wire that is connected to each photoresistor for the columns. You will then get something that looks like this.

(Insert matrix wiring here)

### Circuit Board
The main circuit consists of the Arduino Pro Micro, a shift register and some resistors. I basically just copied one to one the wiring of the diagram that Philipp provided on the Liboard website. Essentially, the columns are wired to the shift register which is connected to the Pro Micro and the rows are wired to directly to the Pro Micro with some resistors.

(Insert images here)

## Flashing the Firmware
The Arduino library for Liboard is provided (here)[https://github.com/LiBoard/Arduino]. You simply flash the firmware to the Pro Micro and this will enable it to output bitboard data to other Liboard programs. Once flashed, you should test that your Liboard works with these (Python scripts)[https://github.com/LiBoard/Python]. The first script you should run it `bitboard.py`. This program shows what squares are currently occupied. If it doesn't seem to be working, try adjusting the `THRESHOLD` value in the `serial_binboard.ino` file.

## Increasing the functionality of Liboard
After using Liboard for a couple days, I noticed that as the day would go by, I would have to manually adjust the `THRESHOLD` value to account for the changes in lighting. I decided to create a PR that enables you to calibrate the thresholds programatically instead of manually.

I first started with editing `serial_binboard.py` to implement a few new features. Instead of having one global threshold value that is set for all photoresistors, I made it so you can also choose to set an individual threshold for each photoresistor. I needed this feature as the photoresistors I installed in my board were all different and had different measurements. I also added "commands" that the user can send through the serial monitor. These commands show things like, the current readings for each square, the current threshold that has been set and a "calibration mode" to set new thresholds without manually uploading the firmware everytime.

The next step was to create a `calibrate_thresholds.py` script that will walk the user through the calibration process.
