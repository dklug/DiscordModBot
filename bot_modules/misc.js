/*jshint esversion: 6*/

var help = "misc.js: if a message includes literal the bot will say literally";

// Create an event listener for messages
bot.on('message', message =>
{
  if (message.author.username!==botusername)
  {
    const cont = message.content.toLowerCase();
    const txtchnl = message.channel;
    if (cont.includes('literal'))
    {
      txtchnl.send('*literally*');
    }
  }
});
