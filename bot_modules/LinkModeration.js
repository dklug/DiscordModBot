/*jshint esversion: 6*/

module.exports = "LinkModeration.js - Sets a cooldown for how many links can be posted\n";

function cool(message)
{
  message.author.linkCount--;
}

// Create an event listener for messages
bot.on('message', message =>
{
  var mauthor = message.author;
  if (mauthor.username!==botusername)
  {
    const cont = message.content.toLowerCase();
    const txtchnl = message.channel;
    //Link Cooldown function
    if (cont.includes("http"))
    {
        if (!mauthor.linkCount)
        {mauthor.linkCount = 0;}
        if (mauthor.linkCount>4)
        {
          message.delete();
          txtchnl.send("Calm down");
        }
        else
        {
          mauthor.linkCount++;
          setTimeout(cool(message),500000);
        }
    }
  }
});
