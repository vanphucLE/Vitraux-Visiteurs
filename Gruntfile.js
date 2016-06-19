module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'assets/js/vitraux-visiteurs.min.js': [
                        'assets/js/partials/_main.js',
                        'assets/js/partials/_courses.js',
                        'assets/js/partials/_map.js',
                        'assets/js/partials/_explore.js',
                        'assets/js/partials/_preview.js',
                        'assets/js/partials/_description.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
