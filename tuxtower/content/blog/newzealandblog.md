+++
title = "New Zealand 2024"
date = 2024-03-02
+++

Over the past month, I have been travelling all around Auckland, New Zealand with my girlfriend. It's the first time I've traveled outside of the country by myself. 

Overall, it was an amazing experience that was definitely worth doing. It was interesting to see the differences between both New Zealand and Australia. You would think that because the two countries are close to each other geographically as well as having a strong political relationship that the countries would be similar. This wasn't the case. Here are some major differences that make New Zealand unique to Australia.

## The Landscape
New Zealand consists of huge mountains that are located all around the outer suburbs. Beautiful mountains surround the landscape and located west of Auckland were some amazing trails within some of these mountains. It felt a bit like Australia's "country". Australia is mainly flatlands and only if you drive 2 to 3 hours outside of Perth, then you would see mountains and agriculture. Whereas New Zealand's agriculture is built right in the heart of the city. You only need to drive 20 minutes outside of Auckland to see cows and sheep.

## The Weather
During my months stay, the weather mainly consisted of warm weather with a lovely cool breeze. The temperature didnt reach higher than 28 degrees which was perfect for me. While I was relaxing in the nice cool climate, back at home it reached a scorching 42 degrees. It was nice to get away from the heat for a while, although I think Australia's weather is much more comfortable all year round whereas New Zealand can get to really cold temperatures especially in winter. It's pretty much the England of the southern hemisphere.

## The People
While Australia is a very multicultural country, New Zealand's demographic of people is in my opinion more diverse. A lot of the diversity of Australia comes from European immigration. Whereas New Zealand has lots more Indians, Asians and Islanders particularly in the southern suburbs where I stayed. This is great if you want a diverse range of amazing cuisines from curry's to Hāngī to dumplings. However, after 2 to 3 weeks of being there, I was missing a freshly cooked wood fired pizza and I wasn't able to find a good Italian cuisine in New Zealand due to there not being any Italians around. I was missing my fellow wogs.

# 27 Minute Montage... YIKES
I put together a montage that I wanted to look back on and I decided to try and use only `ffmpeg`.

Essentially how it's done was I gathered all of the clips I wanted and put them in a directory. I then wrote a bash script that generates a filelist for all the video clips I want in the montage. I wanted all the clips to be no longer than 3 seconds so I added some logic to preprocess the clips to 3 second clips if necessary.

```bash
for f in *.mp4; do
  duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f")
  if (( $(echo "$duration > 3" | bc -l) )); then
    echo "file 'temp_$f'" >> filelist.txt
    ffmpeg -i "$f" -t 3 -c copy "temp_$f"
  else
    echo "file '$f'" >> filelist.txt
  fi
done
```
After my filelist was generated, I simply used this command to concat all the videos together.

```bash
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.wav
```

Then I just replaced the audio with a song of my choice and boom. The magic of `ffmpeg`

```bash
ffmpeg -i output.mp4 -i audio.wav -c:v copy -map 0:v:0 -map 1:a:0 final.mp4
```
Here is the montage if you're interested. It's a bit long so no worries if you get bored, I wanted to make sure I got everything in the video so I can look back on it later.

<iframe width="700" height="400" src="https://www.youtube.com/embed/3jAP1J-uWLk" title="New Zealand 2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
