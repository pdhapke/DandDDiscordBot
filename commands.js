const surgeTable = require('./surgetable.js').table;

module.exports = (client) => {
  return {
    surge: surgeCommand(client),
    roll: rollCommand(client),
  };
};

function surgeCommand(client) {
  return function surge(msg, options) {
    let result = surgeTable[(Math.random() * surgeTable.length) | 0];

    if (has(options, 'me')) {
      msg.reply(result);
    } else if (has(options, 'public')) {
      client.channels.get(msg.channel.id)
        .send(`${result}`);
    } else {
      let notesChannel;
      for (let channel of client.channels.values()) {
        if (channel.name === 'notes') {
          notesChannel = channel;
        }
      }
      notesChannel.send(`${msg.author.username} rolled: ${result}`);
      let gmId = '';
      for (let user of client.users.values()) {
        if (user.username === 'Ropp') {
          gmId = user.id;
        }
      }
      msg.reply(` - A magic surge was sent to <@${gmId}>`);
    }
  };
}

function rollCommand() {
  return function roll(msg, options) {
    let results = ['- unable to parse'];
    let diceOptions = options.length && !(options[0] === '') ? options : ['d20'];
    let diceResults = diceOptions
      .map(option => option.match(/([\d]*)[dD]([\d]+)\+?([\d]+(?<=\+))?(.*)/))
      .filter(o => !!o)
      .map(params => getDieResults(...params));

    if (diceResults) {
      results = [' - you rolled:'].concat(diceResults);
    }

    msg.reply(results.join('\n'));
  };
}

function getDieResults(fullString, numberOfDice, typeOfDice, staticValue, userText) {
  let numberOfDiceToRoll = Number(numberOfDice) || 1;
  let sidesOnDie = Number(typeOfDice) || 20;
  let plusStaticValue = Number(staticValue) || 0;
  let array = Array(numberOfDiceToRoll).fill(0);
  let dieResults = array.map(x => Math.floor(Math.random() * sidesOnDie) + 1);
  return dieResults.join(', ')
    .concat(` - Total: ${dieResults.reduce((t, c) => t + c, plusStaticValue)} ${userText}`);
}

function rollType(dieSize) {
  return Math.floor(Math.random() * dieSize) + 1;
}

function has(opts, string) {
  return opts && opts.includes(string);
}