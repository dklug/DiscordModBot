// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord bot
const bot = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'TOKEN GOES HERE';

// The username of your bot
const username = 'USERNAME GOES HERE';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
bot.on('ready', () => {
  console.log('I am ready!');
});

//message.channel.send('example text to speech message', {'tts':true});

// Create an event listener for messages
bot.on('message', message =>
{
  const cont = message.content.toLowerCase();
  const chnl = message.channel;
  if (message.author.username!==username)
  {
    if (cont.includes('literal'))
    {
      chnl.send('*literally*');
    }

    if (cont.includes(':rosen:'))
    {
      chnl.send('http://imgur.com/Khhnr0X');
    }

    if (cont.includes('think'))
    {
      chnl.send('http://imgur.com/a/6BXDO');
    }

    if (cont.includes('cat'))
    {
      chnl.send('http://imgur.com/a/fvoZS');
    }

    if (cont.includes('prawn')||cont.includes('srars'))
    {
      chnl.send('https://www.youtube.com/watch?v=5mEJbX5pio8');
    }

    if (cont.includes('jiffy')||cont.includes('jeffrey'))
    {
      chnl.send('http://imgur.com/a/BriTS');
    }

    //Detects thinking emoji and spams it a bit
    if (cont.includes(String.fromCodePoint(0x1f914)))
    {
      for (i = 0; i<4; i++)
      {
        chnl.send(':thinking:')
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
