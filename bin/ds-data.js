
var jsonfile = require('jsonfile');
var _ = require('lodash');
var path = require('path');

var file = path.join(__dirname, '..', 'data-min/dungeonslayers-deu.min.json');
var list = jsonfile.readFileSync(file);
var data = _.extend.apply(this, list);
var classes = data.classes;
var talents = data.talents;
var spells = data.spells;


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
