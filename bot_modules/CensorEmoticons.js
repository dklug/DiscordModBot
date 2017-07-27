/*jshint esversion: 6*/

var help = "CensorEmoticons.js - common emoticons will be censored!\n";

// Make and initialize an array of emoticons/emojis
var emoticons = [];
for (e = 0x1f600; e<0x1f9E7; e++)
{
  //console.log(e)
  //console.log(String.fromCodePoint(e));
  emoticons.push(String.fromCodePoint(e));
}

// Create an event listener for messages
bot.on('message', message =>
{
  if (message.author.username!==botusername)
  {
    const cont = message.content.toLowerCase();
    const txtchnl = message.channel;
    emoticons.forEach(function(em){
      if (cont.includes(em))
      {
        txtchnl.send("xd");
        var dmchnl = message.author.createDM();
        message.author.send(cont);
        message.delete();
      }
    });
  }
});
