module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'new-main.css': 'new-main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'watch']);

}