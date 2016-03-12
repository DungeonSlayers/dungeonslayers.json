//#!/usr/bin/env node

var jsonfile = require('jsonfile');
var _ = require('lodash');
var path = require('path');

var file = path.join(__dirname, '..', 'data-min/dungeonslayers-deu.min.json');
var list = jsonfile.readFileSync(file);
var data = _.extend.apply(this, list);

_.each(data.classes, function(cl, classid) {
    _.each(cl.talents, function(talent, id) {
        if (data.talents[id]) return;
        console.error(classid + ' talent missing: ' + id)
    });
    _.each(cl.spells, function(spell, id) {
        if (data.spells[id]) return;
        console.error(classid + 'spell missing: ' + id)
    });
});
