module.exports = "scrumReminder.js: remind me to join scrum at 8pm Monday-Thursday\n";

// Create an event listener for messages
// bot.on('message', message => {
//   const cont = message.content.toLowerCase();
//   const txtchnl = message.channel;
//   console.log(txtchnl);
// });

bot.on('ready', () => {
  loop();
});

// Scrum happens every day at 8pm
function loop() {
  setTimeout(loop, 10000);
  let now = new Date();
  // Monday through Thursday
  let day = now.getDay();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (day > 0 && day < 5 && hour > 18 && hour < 21 && minute>55 && minute<60) {
    let findError = false;
    let me;
    let jobChannel;
    try {
      me = bot.users.find('username', 'Luxab');
      jobChannel = bot.channels.find('name', 'j𝔬𝔟');
    }
    catch (err) {
      console.log(err);
    }
    finally {
      if (!findError) {
        if (hour === 20) {
          if (minute === 0) {
            // Scrum beginning
            jobChannel.send(`${me} scrum time`);
          }
        }
        if (hour === 19) {
          if (minute > 56) {
            // Scrum starting soon
            jobChannel.send(`${me} ${60 - minute} minutes remaining`);
          }
        }
      }
    }

  }
}
