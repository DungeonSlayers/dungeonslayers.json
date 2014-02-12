module.exports = {
    compile: {
        files: {
            'data-min/deu/armor.min.json': 'data/deu/armor.json',
            'data-min/deu/attributes.min.json': 'data/deu/attributes.json',
            'data-min/deu/classes.min.json': 'data/deu/classes.json',
            'data-min/deu/combatvalues.min.json': 'data/deu/combatvalues.json',

            'data-min/eng/armor.min.json': 'data/eng/armor.json',
            'data-min/eng/attributes.min.json': 'data/eng/attributes.json',
            'data-min/eng/classes.min.json': 'data/eng/classes.json',
            'data-min/eng/combatvalues.min.json': 'data/eng/combatvalues.json',

            'data-min/races.min.json': 'data/races.json',
            'data-min/weapons.min.json': 'data/weapons.json',
            'data-min/class-fighter.min.json': 'data/class-fighter.json',
            'data-min/class-scout.min.json': 'data/class-scout.json',
            'data-min/class-mage.min.json': 'data/class-mage.json',
            'data-min/class-mage-healer.min.json': 'data/class-mage-healer.json',
            'data-min/class-mage-sorcerer.min.json': 'data/class-mage-sorcerer.json',
            'data-min/class-mage-wizard.min.json': 'data/class-mage-wizard.json',

            'dungeonslayers-deu.min.json': ['data/deu/**/*.json'],
            'dungeonslayers-eng.min.json': ['data/eng/**/*.json']
        }
    }
};
