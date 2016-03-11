
var jsonfile = require('jsonfile');
var _ = require('lodash');

var classes = jsonfile.readFileSync('../data/deu/classes.json');
var talentswrapper = jsonfile.readFileSync('../data/deu/talents.json');
var spellswrapper = jsonfile.readFileSync('../data/deu/spells.json');
var talents = talentswrapper.talents;
var spells = spellswrapper.spells;


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
    _.each(hash, function (talent) {
        list.push(talent);
    });
    list = _.sortBy(list, function (talent) {
        if (opt.sortby === 'name') return talent.name
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

    getSpells: function (cl, level, options) {
        var opt = options || {};
        return hashToList(getSpellHash(cl, level), options);
    }
};
