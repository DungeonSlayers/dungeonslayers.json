//#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-k, --klasse [type]', 'Add the specified type of class [fighter|scout|healer|wizard|sorcerer]', /^(fighter|scout|healer|wizard|sorcerer)$/i)
  .option('-c, --culture [type]', 'Add the specified type of culture [ascheelfen{sandelfen|waldelfen]', /^(ascheelfen|sandelfen|waldelfen)$/i)
  .option('-s, --stufe [number]', 'Add the specified type of cheese [1-25]', /^(\d+)$/i)
  .option('-o, --order [type]', 'Add the specified type of cheese [name|level]', /^(name|level)$/i)
  .parse(process.argv);

if (!program.klasse) {
  return console.log('Bitte eine gültige klasse mit der option -k angeben (z.B. -k healer');
}

return require('./dsjson-docs').process(program);
