//#!/usr/bin/env node

var jsonfile = require('jsonfile');
var _ = require('lodash');
var path = require('path');

var base = path.join(__dirname, '..');
var classes = jsonfile.readFileSync(path.join(base, 'data/deu/classes.json'));
var talentswrapper = jsonfile.readFileSync(path.join(base, './data/deu/talents.json'));
var spellswrapper = jsonfile.readFileSync(path.join(base, './data/deu/spells.json'));

var talents = talentswrapper.talents;
var spells = spellswrapper.spells;

_.each(classes, function(cl, classid) {
    _.each(cl.talents, function(talent, id) {
        if (talents[id]) return;
        console.error(classid + ' talent missing: ' + id)
    });
    _.each(cl.spells, function(spell, id) {
        if (spells[id]) return;
        console.error(classid + 'spell missing: ' + id)
    });
});
