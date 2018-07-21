/*jshint esversion: 6*/

module.exports = "RoNTaunts.js: type 1-100 while in a voice channel to taunt!\n";

// Voice command Queue
let vqueue = [];

// taunts is an array consisting of each taunt text 0-99 : 1-100
let taunts = fs.readFileSync(tpath+'taunts.txt').toString().split("\n");

function taunt(num,message){
let tauntpath = tpath+num+'.wav';
console.log(tauntpath);
  if (message.member.voiceChannel){
    const vc = message.member.voiceChannel;
      vc.join()
      .then(connection =>{ // Connection is an instance of VoiceConnection
        console.log('Joined voice channel');
        const toPlay = connection.playFile(tauntpath);

        message.channel.send(message.member.user+': ('+num+') '+taunts[num-1]);

        toPlay.on('error', e =>{
          // Catch any errors that may arise
          console.log(e);
        });

        toPlay.on('end',()=>{
          //disconnect once sound is played
          let i = vqueue.shift();
          if (vqueue.length==0)
          {
            vc.leave();
          }
          // Delete triggering message to prevent useless spam
          message.delete();
        });
      });
  }
}

// Create an event listener for messages
bot.on('message', message =>{
  if (message.author.username!==botusername){
    const cont = message.content.toLowerCase();
    //Calls the taunt function
    for (i = 1; i<101; i++){
      if (cont==i && message.member.voiceChannel){
        console.log(i);
        taunt(i,message);
        vqueue.push(i);
      }
    }
  }
});
