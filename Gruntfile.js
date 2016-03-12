module.exports = function (grunt) {

    'use strict';

    var pkg = require("./package.json");

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({
        pkg: pkg,
        jsonlint: require('./grunt/jsonlint.js'),
        minjson: require('./grunt/minjson.js')
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-minjson');

    grunt.registerTask('default', ['jsonlint', 'minjson', 'jsonlint']);
};
