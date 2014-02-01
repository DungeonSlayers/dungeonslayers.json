module.exports = {
    complex_replacement_obj: {
        options: {
            replacements: {
                "armor": {
                    "chainmail": {
                        "name": "Kettenpanzer"
                    },
                    "leatherarmor": {
                        "name": "Lederpanzer"
                    },
                    "lethervambraceandgreaves": {
                        "name": "Lederschienen"
                    },
                    "metalhelmet": {
                        "name": "Metallhelm"
                    },
                     "plategreaves": {
                        "name": "Plattenarmschienen"
                    },
                    "platevambrace": {
                        "name": "Plattenbeinschienen"
                    },
                    "platearmor": {
                        "name": "Plattenpanzer"
                    },
                    "robe": {
                        "name": "Robe"
                    },
                    "runicrobe": {
                        "name": "Robe (runenbestickt)"
                    },
                    "shieldmetal": {
                        "name": "Schild, Metall"
                    },
                    "shieldtower": {
                        "name": "Schild, Turm"
                    },
                    "shieldwooden": {
                        "name": "Schild, Holz"
                    }
                }
            }
        },
        files: [
            {
                expand: true,
                flatten: true,
                src: './src/core/*.json',
                dest: 'data/',
                ext: '.deu.json'
            }
        ]
    }
};
