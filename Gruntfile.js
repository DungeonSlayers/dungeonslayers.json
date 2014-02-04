module.exports = function (grunt) {

    'use strict';

    var pkg = require("./package.json");

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({
        pkg: pkg,
        jsonlint: require('./tasks/jsonlint.js'),
        minjson: require('./tasks/minjson.js')
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-minjson');

    grunt.registerTask('default', ['jsonlint', 'minjson']);
};
