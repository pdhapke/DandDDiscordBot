const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands.js')(client);

const env = require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  let command = msg.content.match(/^\/([\S]{1,})/);
  if (command && commands[command[1]]) {
    let options = msg.content
      .slice(command[0].length)
      .trim()
      .toLowerCase()
      .split(/\s+/);
    commands[command[1]](msg, options);
  }
});
client.login(process.env.BOT_TOKEN);