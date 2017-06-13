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

// Create an event listener for messages
bot.on('message', message =>
{
  if (message.author.username!==username)
  {
    if (message.content.includes('literal'))
    {
      message.channel.send('*literally*');
    }

    if (message.content.includes(':rosen:'))
    {
      message.channel.send('http://imgur.com/Khhnr0X');
    }

    if (message.content.includes('think'))
    {
      message.channel.send('http://imgur.com/a/6BXDO');
    }

    if (message.content.includes('cat'))
    {
      message.channel.send('http://imgur.com/a/fvoZS');
    }

    if (message.content.includes('prawn')||message.content.includes('srars'))
    {
      message.channel.send('https://www.youtube.com/watch?v=5mEJbX5pio8');
    }

    //Detects thinking emoji and spams it a bit
    if (message.content.includes(String.fromCodePoint(0x1f914)))
    {
      for (i = 0; i<4; i++)
      {
        message.channel.send(':thinking:')
      }
    }
  }

  //Deletes all messages that the bot sends after a few seconds
  if (message.author.username===username)
  {
    setTimeout(message => {message.delete();}, 5000, message);
  }
});

// Log our bot in
bot.login(token);
