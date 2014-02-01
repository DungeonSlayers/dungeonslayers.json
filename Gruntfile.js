module.exports = function (grunt) {

    'use strict';

    var pkg = require("./package.json");

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: pkg,

        jsonlint: require('./tasks/jsonlint.js'),
        lazy_json_replace: require('./i18n/core/deu.js')
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-lazy-json-replace');

    grunt.registerTask('deu', ['lazy_json_replace']);
    grunt.registerTask('default', ['jsonlint', 'deu']);
};
