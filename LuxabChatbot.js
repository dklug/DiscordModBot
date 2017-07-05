//--------------IMPORTS--------------//

// Import the discord.js module
const Discord = require('discord.js');

// Import filesystem module
const fs = require('fs');

//--------------VARIABLES AND CONSTANTS--------------//
// Create an instance of a Discord bot
const bot = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
// const token = 'TOKEN GOES HERE';
const token = 'Mjk2NDA4MjI0MTc1ODgyMjQy.DDhrxg.8QizANcmvBElz4fogXnr5t5zTUI';

// The username of your bot
// const botusername = 'USERNAME GOES HERE';
const botusername = 'testybot';

// The filepath of the bot, used for playing taunt files
// const path = 'FILE PATH GOES HERE /LuxabChatbot/taunts/';
const path = '/home/dklug/Documents/DiscordBot/LuxabChatbot/taunts/';

// Voice command Queue
var vqueue = [];

// taunts is an array consisting of each taunt text 0-99 : 1-100
var taunts = fs.readFileSync(path+'taunts.txt').toString().split("\n");

//
var listen = true;

//---------------------------------------------------//

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

//message.channel.send('example text to speech message', {'tts':true});

// Create an event listener for messages
bot.on('message', message =>
{
  const cont = message.content.toLowerCase();
  const txtchnl = message.channel;

  //Checks if an ADMINISTRATOR has told the bot to start listening
  if (cont===("!start") && message.member.permissions.has("ADMINISTRATOR"))
  {
    console.log("Listening");
    bot.user.setPresence({
      'status': 'online',
      'afk': false,
      'game': {
        'name': 'LuxabChatbot'
      }
    });
    setTimeout(message => {message.delete();}, 500, message);
    listen = true;
    return;
  }

  if (listen)
  {
    //Checks if an ADMINISTRATOR has told the bot to stop listening
    if (cont===("!stop") && message.member.permissions.has("ADMINISTRATOR"))
    {
      console.log("Not listening, waiting for !start");
      bot.user.setPresence({
        'status': 'invisible',
        'afk': false,
        'game': {
          'name': ''
        }
      });
      setTimeout(message => {message.delete();}, 500, message);
      listen = false;
      return;
    }

    function taunt(num)
    {
      if (message.member.voiceChannel)
      {
        const vc = message.member.voiceChannel;
          vc.join()
          .then(connection =>
            { // Connection is an instance of VoiceConnection
            const toPlay = connection.playFile(path+num+'.wav');

            txtchnl.send(message.member.user+': ('+num+') '+taunts[num-1]);

            toPlay.on('error', e =>
            {
              // Catch any errors that may arise
              console.log(e);
            });

            toPlay.on('end',()=>{
              //disconnect once sound is played
              var i = vqueue.shift();
              if (vqueue.length==0)
              {
                vc.leave();
              }
              // Set timer to delete triggering message to prevent useless spam
              setTimeout(message => {message.delete();}, 0, message);
            });
          })
      }
    }

    if (message.author.username!==botusername)
    {
      for (i = 1; i<101; i++)
      {
        if (cont==i && message.member.voiceChannel)
        {
          //console.log(i);
          taunt(i);
          vqueue.push(i);
        }
      }

      if (cont.includes('literal'))
      {
        txtchnl.send('*literally*');
      }

      if (cont.includes(':rosen:'))
      {
        txtchnl.send('http://imgur.com/Khhnr0X');
      }

      if (cont==('think'))
      {
        txtchnl.send('http://imgur.com/a/6BXDO');
      }

      if (cont==('cat'))
      {
        txtchnl.send('http://imgur.com/a/fvoZS');
      }

      if (cont.includes('prawn')||cont.includes('srars'))
      {
        txtchnl.send('https://www.youtube.com/watch?v=5mEJbX5pio8');
      }

      if (cont==('jiffy')||cont==('jeffrey'))
      {
        txtchnl.send('http://imgur.com/a/BriTS');
      }

      //Detects thinking emoji and spams it a bit
      if (cont.includes(String.fromCodePoint(0x1f914)))
      {
        txtchnl.send(':thinking:')
      }

      if (cont===(String.fromCodePoint(0x1f914)))
      {
        setTimeout(message => {message.delete();}, 5000, message);
      }

    }

  }

  //console.log('username: '+message.author.username);
  //console.log('content: '+message.content);

  if (message.author.username===botusername)
  {
    if (cont.includes(":thinking:"))
    {
      for (i=0; i<16; i++)
      {
        setTimeout(message => {message.edit(message.content+=":thinking:");},i*2000,message);
      }
      setTimeout(message => {message.delete();}, 32000, message);
    }
    else
    {
      //Deletes all messages that the bot sends after a few seconds
      setTimeout(message => {message.delete();}, 5000, message);
    }


  }
});

// Log our bot in
bot.login(token);
