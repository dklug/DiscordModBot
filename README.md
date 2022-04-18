ARCHIVED - DO NOT USE
Haven't touched this in a long time and it's super out of date

# DiscordModBot
Hackable Modular Discord.js bot
 * Add your own modules! On first startup the bot will ask which modules you'd like to load from the bot_modules folder
   * Five examples of module structure and use are in the bot_modules folder.
 * !help menu: Just type !help and the bot will DM you a list of the modules currently running, with a description of each module.
 * Endless possibilities! Censor all emojis! Play amusing sounds in your voice channel! The choice is yours.

## Setup before running:

* Download/install Node.js: https://nodejs.org/

* Download/install Python 2: https://www.python.org/downloads/

* Download/install ffmpeg: https://ffmpeg.org/download.html

* Just Windows Things™:
  * Download/install the Win8.1 SDK: https://developer.microsoft.com/en-us/windows/downloads/windows-8-1-sdk
  * Download/install Visual Studio with C++ desktop application support (tested with Visual Studio 2017 community): https://www.visualstudio.com/downloads/
  * A good alternative to this is to use Linux Subsystem for Windows
  * npm install --global --production windows-build-tools
  
* npm install

* Still not working? Try using the latest version of Node.
  
## To run:

* node DiscordModBot.js *or* npm start

* Running for the first time will prompt you for the bot's username, token, and which modules you would like enabled. Run the bot again and you're good to go!

## Included Modules:

* Alert.js: 
  * !alert repeatedly sends a TTS (Text To Speech) message
  * !alertquiet repeatedly sends a message
  * !stopalert stops any alert in progress.
* CensorEmoticons.js
  * Automatically deletes any message with an emoji in it
  * Sends the offending message back to the person who posted it, so they don't lose what they typed.
* LinkModeration.js
  * Limits the amount of links that can be sent over a certain amount of time by one person
  * Unstable, causes the bot to crash
* misc.js
  * Features some inside jokes and other doodads for the Discord server I host this bot in
* RoNTaunts.js
  * Allows you to use taunts 1-100 in the voice channel, sourced from the game Rise of Nations, first published in 2003
  * You can buy this game on steam! http://store.steampowered.com/app/287450/Rise_of_Nations_Extended_Edition/


## Special Thanks:

https://github.com/cheddar-lang/syncprompt - (used for synchronous first-time setup)
