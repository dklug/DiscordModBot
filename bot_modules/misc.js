/*jshint esversion: 6*/

exports.help = "misc.js: if a message includes literal the bot will say literally\n";

// Create an event listener for messages
bot.on('message', message =>
{
  const cont = message.content.toLowerCase();
  const txtchnl = message.channel;
  if (message.author.username!==botusername)
  {
    if (cont.includes('literal'))
    {
      txtchnl.send('*literally*');
    }

    if (cont===('lenny'))
    {
      txtchnl.send(message.member.user+" ( ͡° ͜ʖ ͡°)");
      message.delete();
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
      txtchnl.send(':thinking:');
    }

    if (cont===(String.fromCodePoint(0x1f914)))
    {
      setTimeout(message => {message.delete();}, 5000, message);
    }
  }
  else //IF THE MESSAGES ARE FROM THE BOT
  {
    if (cont.includes(":thinking:"))
    {
      for (i=0; i<16; i++)
      {
        setTimeout(message => {message.edit(message.content+=":thinking:");},i*2000,message);
      }
      setTimeout(message => {message.delete();}, 32000, message);
    }

    if (cont.includes('( ͡° ͜ʖ ͡°)'))
    message.deletable=0;
  }

});
