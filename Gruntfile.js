module.exports = function (grunt) {

    'use strict';

    var pkg = require("./package.json");

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: pkg,

        jsonlint:  require('./tasks/jsonlint.js')
        // jshint:  require('./tasks/jshint.js'),
        // clean: require('./tasks/clean.js'),
        // concat: require('./tasks/concat.js'),
        // copy: require('./tasks/copy.js'),
        // htmlmin: require('./tasks/htmlmin.js'),
        // uglify: require('./tasks/uglify.js'),
        // watch: {
        //     files: '<%= jshint.files %>',
        //     tasks: 'jshint'
        // }
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsonlint');

    grunt.registerTask('default', 'jsonlint');
};
