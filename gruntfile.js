module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            prod: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed'
                },
                files: [{
                    src: 'src/css/styles.scss',
                    dest: 'builds/production/css/styles.css'
                }]
            },
            devt: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded'
                },
                files: [{
                    src: 'src/css/styles.scss',
                    dest: 'builds/development/css/styles.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['sass']);
};