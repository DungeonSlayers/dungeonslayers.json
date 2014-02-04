module.exports = {
    compile: {
        files: {
            'data-min/armor.min.json': 'data/armor.json',
            'data-min/attributes.min.json': 'data/attributes.json',
            'data-min/classes.min.json': 'data/classes.json',
            'data-min/combatvalues.min.json': 'data/combatvalues.json',
            'data-min/races.min.json': 'data/races.json',
            'data-min/weapons.min.json': 'data/weapons.json',
            'dungeonslayers.min.json': ['data/*.json']
        }
    }
};
