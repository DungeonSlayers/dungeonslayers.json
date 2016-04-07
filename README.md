![http://dungeonslayers.net](http://dungeonslayers.net/grafiken/layout/dslogopur.png)
dungeonslayers.json
=============

## TODO
- [x] fix spell ids
- [x] add spell details
- [x] add spell prices
- [x] add spells for each class
- [ ] add spells categories (Heilzauber, Schutzzauber, Elementar, Lichtzauber, Schattenzauber, Feuerzauber, Elementarzauber, Geistebeeinflussend, Nekromantie)
- [ ] add hero classes
- [ ] https://github.com/assemble/grunt-convert

## Thanks
- Friedemann Schneider: for talent short descriptions (german)
- [Momo](http://s176520660.online.de/dungeonslayers/forum/index.php?action=profile;u=812): for basic spell data (german)


## Files/Folders

### data
+ source files

### data-min
+ minified source files

```
data-min
├── deu
│   ├── armor.min.json
│   ├── attributes.min.json
│   ├── classes.min.json
│   ├── combatvalues.min.json
│   ├── races.min.json
│   ├── spells.min.json
│   └── weapons.min.json
└── dungeonslayers-deu.min.json
```

### tasks/
+ grunt tasks

## Contribution
Use you favorite editor to edit/create files in **data**. When you're finished run grunt to check and minify (output is **data-min** and dungeonslayers.json).



