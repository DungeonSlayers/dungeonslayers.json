
var jsonfile = require('jsonfile');
var _ = require('lodash');
var path = require('path');

var file = path.join(__dirname, '..', 'data-min/dungeonslayers-deu.min.json');
var list = jsonfile.readFileSync(file);
var data = _.extend.apply(this, list);
var classes = data.classes;
var talents = data.talents;
var spells = data.spells;
var cultures = data.cultures;
var talentsets = data.talentsets;

function getTalentHash(cl, level) {
    var cltalents = classes[cl].talents;
    var data = {}, list = [];
    // get hash
    _.each(cltalents, function (talent, id) {
        var target = cltalents[id];
        if (target.prequisite > level) return;
        data[id] = _.merge({}, talents[id], target);
    });
    return data;
}

function getMergedTalentHash(culture, base) {
    _.each(culture, function (talent, id) {
        // special: wissensgebiet
        id = id.split(':')[0];
        var basetalent = base[id];
        if (!basetalent) return;
        if (talent.max >= basetalent.max) return;
        _.merge(talent, { prequisite: basetalent.prequisite, prequisitemax: basetalent.max });
        // culture talent greater
        delete base[id];
    });
    return {
        culture: culture,
        base: base
    }
}

function getCultureHash(cu, level) {
    var data = cultures[cu].singles,
        list = {};
    // get hash
    _.each(cultures[cu].sets, function (id) {
        // resolve sets
        data = _.merge(data, talentsets[id]);
    });
    _.each(data, function (talent, id) {
        post = id.split(':')[1];
        id = id.split(':')[0];
        // add name
        talent.name = (talents[id].name + (post ? ':' + post : ''));
        talent.compact = talents[id].compact;
        talent.details = talents[id].details;
    });
    return data;
}

function getSpellHash(cl, level) {
    var clspells = (classes[cl] || {}).spells || [];
    var data = {}, list = [];
    // get hash
    _.each(clspells, function (talent, id) {
        var target = clspells[id];
        if (target.prequisite > level) return;
        data[id] = _.merge({ id: id }, spells[id], target);
    });
    return data;
}

function hashToList(hash, options) {
    var opt = _.merge({ sortby: 'level' }, options || {});
    var list = [];
    _.each(hash, function (talent, id) {
        list.push(_.merge(talent, {id: id }));
    });
    list = _.sortBy(list, function (talent) {
        if (opt.sortby === 'name' || talent.points) return talent.name
        if (opt.sortby === 'level') {
            var pre = String(talent.prequisite);
            return (pre.length < 2 ? '0' : '') + pre + talent.name
        }
        return talent.id;
    });
    return list;
}

module.exports = {
    getTalents: function (cl, level, options) {
        var opt = options || {};
        return hashToList(getTalentHash(cl, level), options);
    },

    getMergedTalents: function (cl, cu, level, options) {
        var opt = options || {};
        var talents = getMergedTalentHash(
                getCultureHash(cu),
                getTalentHash(cl, level)
            );
        return {
            culture: hashToList(talents.culture, options),
            base: hashToList(talents.base, options)
        }
    },

    getCultureTalents: function (cu, options) {
        var opt = options || {};
        return hashToList(getCultureHash(cu), options);
    },

    getSpells: function (cl, level, options) {
        var opt = options || {};
        return hashToList(getSpellHash(cl, level), options);
    },

    getClasses: function () {
        return classes;
    }
};
