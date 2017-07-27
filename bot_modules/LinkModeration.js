/*jshint esversion: 6*/

var help = "LinkModeration.js - Sets a cooldown for how many links can be posted\n";

// Create an event listener for messages
bot.on('message', message =>
{
  if (message.author.username!==botusername)
  {
    const cont = message.content.toLowerCase();
    const txtchnl = message.channel;
    //Link Cooldown function
    if (cont.includes("http"))
    {
        if (!message.author.linkCount)
        {message.author.linkCount = 0;}
        if (message.author.linkCount>4)
        {
          message.delete();
          txtchnl.send("Calm down");
        }
        else
        {
          message.author.linkCount++;
          setTimeout(function(message){message.author.linkCount--;},500000);
        }
    }
  }
});
