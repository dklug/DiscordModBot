// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord bot
const bot = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'TOKEN GOES HERE';

// The username of your bot
const username = 'USERNAME GOES HERE';

// The filepath of the bot, used for playing taunt files
const path = 'FILE PATH GOES HERE /LuxabChatbot/taunts/';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
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

  function taunt(num)
  {
    if (message.member.voiceChannel)
    {
      message.member.voiceChannel.join()
        .then(connection =>
          { // Connection is an instance of VoiceConnection
          const toPlay = connection.playFile(path+num+'.wav');
          txtchnl.send('('+num+')');
          toPlay.on('error', e =>
          {
            // Catch any errors that may arise
            console.log(e);
          });

          toPlay.on('end',()=>{
            //disconnect once sound is played
            message.member.voiceChannel.leave();
          });
        })
        .catch(console.log);
    }
  }

  if (message.author.username!==username)
  {
    for (i = 1; i<101; i++)
    {
      if (cont==i)
      {
        //console.log(i);
        taunt(i);
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

    if (cont.includes('think'))
    {
      txtchnl.send('http://imgur.com/a/6BXDO');
    }

    if (cont.includes('cat'))
    {
      txtchnl.send('http://imgur.com/a/fvoZS');
    }

    if (cont.includes('prawn')||cont.includes('srars'))
    {
      txtchnl.send('https://www.youtube.com/watch?v=5mEJbX5pio8');
    }

    if (cont.includes('jiffy')||cont.includes('jeffrey'))
    {
      txtchnl.send('http://imgur.com/a/BriTS');
    }

    //Detects thinking emoji and spams it a bit
    if (cont.includes(String.fromCodePoint(0x1f914)))
    {
      for (i = 0; i<4; i++)
      {
        txtchnl.send(':thinking:')
      }
    }

  }

  //console.log('username: '+message.author.username);
  //console.log('content: '+message.content);
  //Deletes all messages that the bot sends after a few seconds
  if (message.author.username===username)
  {
    setTimeout(message => {message.delete();}, 5000, message);
  }
});

// Log our bot in
bot.login(token);
