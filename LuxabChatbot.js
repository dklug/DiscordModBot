//--------------IMPORTS--------------//

// Import dotenv module
require('dotenv').config();

// Import ffmpeg module
const FFMPEG = require('ffmpeg');

// Import the discord.js module
const Discord = require('discord.js');

// Import filesystem module
const fs = require('fs');

//--------------VARIABLES AND CONSTANTS--------------//
// Create an instance of a Discord bot
const bot = new Discord.Client();

const botusername = process.env.BOT_USERNAME;
const token = process.env.TOKEN;
const path = process.env.TAUNTPATH;

// Voice command Queue
var vqueue = [];

// Make and initialize an array of emoticons/emojis
var emoticons = [];
for (e = 0x1f600; e<0x1f9E7; e++)
{
  //console.log(e)
  //console.log(String.fromCodePoint(e));
  emoticons.push(String.fromCodePoint(e))
}

// taunts is an array consisting of each taunt text 0-99 : 1-100
var taunts = fs.readFileSync(path+'taunts.txt').toString().split("\n");

// listen determines whether the bot listens for things (other than !start)
var listen = true;

// Variables for the alerts
var alerting = false;
var alerts = [];
var ttsenabled = false;


//---------------------------------------------------//

// Log our bot in
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

    var alstr = "null";

    function alert()
    {
      if (alerting)
      {
        //decision 1 is how many times the alert will be in one message
        var decision1 = Math.ceil(Math.random()*4);

        //console.log(decision);

        var printout = "";

        while (decision1>0)
        {
          var decision2 = Math.ceil(Math.random()*4);
          printout+=alstr
          switch(decision2)
          {
            case 1:
            printout+=",";
            break;
            case 2:
            printout+=";";
            break;
            case 3:
            printout+="!";
            break;
            case 4:
            printout+="?";
            break;
          }

          decision1--;
        }

        txtchnl.send(printout, {'tts':ttsenabled});
      }
    }

    function taunt(num)
    {
		var tauntpath = path+num+'.wav';
		console.log(tauntpath);
      if (message.member.voiceChannel)
      {
        const vc = message.member.voiceChannel;
          vc.join()
          .then(connection =>
            { // Connection is an instance of VoiceConnection
			console.log('Joined voice channel');
            const toPlay = connection.playFile(tauntpath);

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
              // Delete triggering message to prevent useless spam
              message.delete();
            });
          })
      }
    }

    function cool()
    {message.author.linkCount--;}

    if (message.author.username!==botusername)
    {
      //Link Cooldown function
      if (cont.includes("http"))
      {
          if (!message.author.linkCount)
          {message.author.linkCount = 0;}
          if (message.author.linkCount>4)
          {
            message.delete();
            txtchnl.send("Calm down")
          }
          else
          {
            message.author.linkCount++;
            setTimeout(cool,500000);
          }
      }

      //Calls the taunt function
      for (i = 1; i<101; i++)
      {
        if (cont==i && message.member.voiceChannel)
        {
          console.log(i);
          taunt(i);
          vqueue.push(i);
        }
      }

      if (cont.includes("!alert"))
      {
        alstr = cont.slice(6,cont.length);
        alerting = true;
        ttsenabled = true;
        const timeout = setInterval(alert,5000);
        alerts.push(timeout);
      }

      if (cont.includes("!alertquiet"))
      {
        alstr = cont.slice(11,cont.length);
        alerting = true;
        ttsenabled = false;
        const timeout = setInterval(alert,5000);
        alerts.push(timeout);
      }

      if (cont.includes("!stopalert"))
      {
        alerting = false;
        console.log("alerts array length: "+alerts.length)
        while (alerts.length>0)
        {
          clearInterval(alerts[alerts.length-1])
          alerts.pop();
        }
      }

      if (cont===('lenny'))
      {
        txtchnl.send(message.member.user+" ( ͡° ͜ʖ ͡°)");
        message.delete();
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

      emoticons.forEach(function(em){
        if (cont.includes(em))
        {
          txtchnl.send("xd")
          var dmchnl = message.author.createDM();
          message.author.send(cont);
          message.delete();
        }
      })

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
      if (cont.includes('( ͡° ͜ʖ ͡°)'))
      return;

      if (message.channel.type!="dm")
      {
        //Deletes all messages that the bot sends after a few seconds
        setTimeout(message => {message.delete();}, 5000, message);
      }

    }


  }
});
