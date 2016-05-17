module.exports = {

  process: function (opt) {

    var fs = require('fs');
    var os = require('os');
    var _ = require('lodash');
    var ds = require('./dsjson');
    var toRoman = require('roman-numerals').toRoman;

    if (!opt.klasse) {
      return console.log('Bitte eine gültige klasse mit der option -k angeben (z.B. -k healer');
    }

    opt.sortby = opt.order || 'level';
    opt.stufe = opt.stufe || 25;
    opt.culture = opt.culture || '_none'
    opt.language = 'deu';

    opt.classname = ds.getClasses()[opt.klasse].name;

    // output
    // TODO: refactor block
    var dir = __dirname + '/../docs/deu/' + opt.classname.toLowerCase();
    var file  = dir + '/' + opt.culture + '.md';
    if (!fs.existsSync(__dirname + '/../docs')) { fs.mkdirSync(__dirname + '/../docs'); }
    if (!fs.existsSync(__dirname + '/../docs/deu/')) { fs.mkdirSync(__dirname + '/../docs/deu/'); }
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

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

    var talents = ds.getMergedTalents(opt.klasse, opt.culture, opt.stufe, { sortby: opt.sortby });

    // Header
    add('# ' + opt.classname);
    add();
    add('**Kultur: ' + opt.culture + '**');
    add();

    // culturetalents
    if (talents.culture.length) {
      add('## Kultur-Talente');
      add();
      var culturetalents = talents.culture;
      var current = 0;

      // talent table
      add('| Name | LP | Ränge | Effekt |');
      add('|------|-------|-------|--------|');
      _.each(culturetalents, function (data) {
        var baseappendix = data.prequisite ? ' (' + toRoman(data.prequisitemax) + ' ab Stufe ' + data.prequisite + ')' : '';
        add('|' + data.name  + '|' + data.points + '|' + toRoman(data.max) + baseappendix + '|' + data.compact + '|');
      });
      add();

      // talent details
      _.each(culturetalents, function (data) {
        var baseappendix = data.prequisite ? ' (' + toRoman(data.prequisitemax) + ' ab Stufe ' + data.prequisite + ')' : '';
        add('__' + data.name + '__');
        add()
        add('- Ränge: ' + toRoman(data.max) + baseappendix);
        add('- LP: ' + data.points);
        add('- Übersicht: '+ data.compact);
        if (data.special) add('- Besonderheit: '+ data.special);
        add()
        add('*' + data.details + '*');
        add()
      });
    }

    // talents
    add('## Talents ');
    add();
    var talents = talents.base;
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
      if (current !== data.prequisite && opt.sortby === 'level') {
        add('### Stufe ' + data.prequisite)
        add()
        current = data.prequisite;
      }
      add('__' + data.name + '__');
      add()
      add('- Ränge: ' + toRoman(data.max));
      add('- Übersicht: '+ data.compact);
      add()
      add('*' + data.details + '*');
      add()
    });

    // spell
    var spells = ds.getSpells(opt.klasse, opt.stufe, { sortby: opt.sortby });
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
      if (current !== data.prequisite && opt.sortby === 'level') {
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
    add('<!-- ' + opt.klasse + ' ' + opt.stufe + ' ' + opt.language + ' -->')
    add('<!-- talents: ' + talents.length + ' -->')
    add('<!-- spells: ' + spells.length + ' -->')

    write();
  }
}

