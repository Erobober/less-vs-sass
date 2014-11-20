module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
          development: {
            files: {
              "./styles/main.css": "./styles/main.less"
            }
          }
        },
        sass: {
            dist: {
                files: {
                    './styles/new-main.css': './styles/new-main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['./styles/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'less', 'watch']);

}