![http://dungeonslayers.net](http://dungeonslayers.net/grafiken/layout/dslogopur.png)
dungeonslayers.json
=============

##TODO
- [ ] fix spell ids
- [ ] add spell details
- [ ] add spell prices
- [ ] https://github.com/assemble/grunt-convert

##Thanks
- Friedemann Schneider: for talent short descriptions (german)
- [Momo](http://s176520660.online.de/dungeonslayers/forum/index.php?action=profile;u=812): for basic spell data (german)


##Files/Folders

###data
+ source files

###data-min
+ minified source files

```
data-min
├── deu
│   ├── armor.min.json
│   ├── attributes.min.json
│   ├── class-fighter.min.json
│   ├── class-mage-healer.min.json
│   ├── class-mage-sorcerer.min.json
│   ├── class-mage-wizard.min.json
│   ├── class-mage.min.json
│   ├── class-scout.min.json
│   ├── classes.min.json
│   ├── combatvalues.min.json
│   ├── races.min.json
│   └── weapons.min.json
├── dungeonslayers-deu.min.json
├── dungeonslayers-eng.min.json
└── eng
    ├── armor.min.json
    ├── attributes.min.json
    ├── class-fighter.min.json
    ├── class-mage-healer.min.json
    ├── class-mage-sorcerer.min.json
    ├── class-mage-wizard.min.json
    ├── class-mage.min.json
    ├── class-scout.min.json
    ├── classes.min.json
    ├── combatvalues.min.json
    ├── races.min.json
    └── weapons.min.json
```

###tasks/
+ grunt tasks

##Contribution
Use you favorite editor to edit/create files in **data**. When you're finished run grunt to check and minify (output is **data-min** and dungeonslayers.json).



