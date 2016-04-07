
//#!/usr/bin/env node

var fs = require('fs');
var os = require('os');
var _ = require('lodash');
var ds = require('./ds-data');

var program = require('commander');




program
  .version('0.0.1')
  .option('-k, --klasse [type]', 'Add the specified type of cheese [fighter|scout|healer|wizard|sorcerer]', /^(fighter|scout|healer|wizard|sorcerer)$/i)
  .option('-s, --stufe [number]', 'Add the specified type of cheese [1-20]', /^(\d+)$/i)
  .option('-l, --language [number]', 'Add the specified type of cheese [deu|eng]', /^(deu|eng)$/i)
  .option('-o, --order [type]', 'Add the specified type of cheese [name|level]', /^(name|level)$/i)
  .parse(process.argv);

/**
 * Everything in the file should be customized
 */

if (!program.klasse) {
  return console.log('Bitte eine gültige klasse mit der option -k angeben (z.B. -k healer');
}

program.sortby = program.order || 'name';
program.stufe = program.stufe || 25;
program.language = program.language || 'deu';

// output
var dir = '../docs';
var file  = dir + '/' + program.klasse + '.md';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

/**
 * Application
 */

var content = '';

function add (text) {
    if (text) { content = content.concat(text); }
    content = content.concat(os.EOL);
}

function write () {
    fs.writeFile(file, content, function (err) {
      if (err) {throw err;}
    });
}

// Header
add('# ' + program.klasse);
add();

// talents
add('## Talents ');
add();
var talents = ds.getTalents(program.klasse, program.stufe, { sortby: program.sortby });
var current = 0;

// talent table
add('| Name | Stufe | Ränge | Effekt |');
add('|------|-------|-------|--------|');
_.each(talents, function (data) {
  add('|' + data.name  + '|' + data.prequisite + '|' + data.max + '|' + data.compact + '|');
});
add();

// talent details
_.each(talents, function (data) {
  // level headings
  if (current !== data.prequisite && program.sortby === 'level') {
    add('### Stufe ' + data.prequisite)
    add()
    current = data.prequisite;
  }
  add('__' + data.name + '__');
  add()
  add('- Ränge: ' + data.max);
  add('- Übersicht: '+ data.compact);
  add()
  add('*' + data.details + '*');
  add()
});

// spell
var spells = ds.getSpells(program.klasse, program.stufe, { sortby: program.sortby });
if (spells.length) {
  add('## Spells ');
  add();

  // table
  add('| Name | Distanz | Abklingzeit | Effekt |');
  add('|------|-------|-------|--------|');
  _.each(spells, function (data) {
    add('|' + (data.name || data.id)  + '|' + data.distance + '|' + data.cooldown + '|' + data.compact + '|');
  });
  add();

  // details
  _.each(spells, function (data) {
  // level headings
  if (current !== data.prequisite && program.sortby === 'level') {
    add('### Stufe ' + data.prequisite)
    add()
    current = data.prequisite;
  }

    add('__' + data.name + '__');
    add()
    add('- Art: ' + data.type);
    add('- Zauberbonus: ' + data.bonus);
    add('- Effekt: '+ data.compact);
    add('- Dauer: ' + data.duration);
    add('- Reichweite: ' + data.distance);
    add('- Abklingzeit: ' + data.cooldown);
    if (data.category) add('- Kategorie: ' + data.category);
    add()
    add('*' + data.details + '*');
    add()
  });
}


// comments
add('<!-- ' + program.klasse + ' ' + program.stufe + ' ' + program.language + ' -->')
add('<!-- talents: ' + talents.length + ' -->')
add('<!-- spells: ' + spells.length + ' -->')

write();
