module.exports = "SoundPlayer.js: type filename to play in chat\n";

// Voice command Queue
let vqueue = [];

// sounds is an array consisting of the filenames of each sound
let sounds = fs.readdirSync(spath);
console.log(sounds);

function playSound(fileName, message) {
  if (fileName === undefined) { return; }
  vqueue.push(fileName)
  let soundpath = spath + fileName;
  console.log(soundpath);
  if (message.member.voiceChannel) {
    const vc = message.member.voiceChannel;
    vc.join()
      .then(connection => { // Connection is an instance of VoiceConnection
        console.log('Joined voice channel');
        const toPlay = connection.playFile(soundpath);

        message.channel.send(message.member.user + ': ' + fileName);

        toPlay.on('error', e => {
          // Catch any errors that may arise
          console.log(e);
        });

        toPlay.on('end', () => {
          //disconnect once sound is played
          let i = vqueue.shift();
          if (vqueue.length == 0) {
            vc.leave();
          }
          // Delete triggering message to prevent useless spam
          message.delete();
        });
      });
  }
}

// Create an event listener for messages
bot.on('message', message => {
  if (message.author.username !== botusername) {
    const cont = message.content.toLowerCase();
    //Calls the sound function

    playSound(
      sounds.find(element => {
        //console.log(element);
        return element.includes(cont)
      }),
      message);
  }
});
