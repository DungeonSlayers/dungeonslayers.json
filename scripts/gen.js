//#!/usr/bin/env node

var jsonfile = require('jsonfile');
var _ = require('lodash');
var path = require('path');

var file = path.join(__dirname, '..', 'data-min/dungeonslayers-deu.min.json');
var list = jsonfile.readFileSync(file);
var data = _.extend.apply(this, list);
var gen = require('../bin/dsjson-docs');

_.each(data.classes, function (classdata, classid) {
    _.each(data.cultures, function (culturedata, cultureid) {
        // invalid
        var isDwarf = ['bergzwerge', 'fjordzwerge', 'wüstenzwerge'].indexOf(cultureid) > -1;
        var isHalfling = ['feldler', 'gassner', 'sandner'].indexOf(cultureid) > -1;
        var isArcane = ['sorcerer', 'wizard', 'healer'].indexOf(classid) > -1;
        if (isDwarf && isArcane && classid !== 'healer') return;
        if (isHalfling && isArcane) return;
        // valid
        gen.process({ klasse: classid, culture: cultureid });
    });
    gen.process({ klasse: classid, culture: '_none' });
});


