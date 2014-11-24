module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
          development: {
            files: {
              "./styles/less/main.css": "./styles/less/main.less"
            }
          }
        },
        sass: {
            dist: {
                files: {
                    './styles/sass/main.css': './styles/sass/main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['./styles/**/*.scss', './styles/**/*.less'],
                tasks: ['less', 'sass']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'less', 'watch']);

}