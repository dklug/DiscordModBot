//--------------IMPORTS--------------//

/*jshint esversion: 6*/

// Import dotenv module
require('dotenv').config();

// Import ffmpeg module
const FFMPEG = require('ffmpeg');

// Import the discord.js module
const Discord = require('discord.js');

// Import filesystem module
fs = require('fs');

//--------------VARIABLES AND CONSTANTS--------------//
// Create an instance of a Discord bot
bot = new Discord.Client();

botusername = process.env.BOT_USERNAME;
token = process.env.TOKEN;
tpath = process.env.TAUNTPATH;
var help = '';

// get an array of modules from the bot_modules folder
var modules = fs.readdirSync('./bot_modules/');

// require the array of modules
for (var mod in modules)
{
  var define = require('./bot_modules/'+modules[mod]);
  help += define.help;
  console.log('Loaded Module: '+modules[mod]);
}

//---------------------------------------------------//

// Log the bot in
bot.login(token);

// Ready event, initializes bot
bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setPresence({
    'status': 'online',
    'afk': false,
    'game': {
      'name': 'LuxabChatbot'
    }
  });
});

// Create an event listener for messages
bot.on('message', message =>
{
  const cont = message.content.toLowerCase();
  const txtchnl = message.channel;

  if (message.author.username!==botusername)
  {
    //!help function sends user the available commands for the bot
    if (cont===("!help"))
    {
      var dmchnl = message.author.createDM();
      var help = '';
      for (var v in modules)
      {
        help+=v.help;
      }
      message.author.send(help,{'code':1});
    }
  }

  if (message.author.username===botusername)
  {
      if (message.channel.type!="dm" && message.deletable!=0)
      {
        //Deletes all messages that the bot sends after a few seconds
        setTimeout(message => {message.delete();}, 5000, message);
      }
  }
});
