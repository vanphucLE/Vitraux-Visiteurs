module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'assets/js/vitraux-visiteurs.min.js': [
                        'assets/js/main.js',
                        'assets/js/courses.js',
                        'assets/js/map.js',
                        'assets/js/explore.js',
                        'assets/js/preview.js',
                        'assets/js/description.js'
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
