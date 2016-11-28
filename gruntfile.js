module.exports = function (grunt) {
    grunt.initConfig({
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'builds/production/index.min.html': 'src/index.html'
                }
            },
            dev: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },
                files: {
                    'builds/development/index.min.html': 'src/index.html'
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['src/scripts/**/*.js']
        },

        concat: {
            prod: {
                src: ['src/scripts/**/**.js'],
                dest: 'builds/production/scripts/app.js'
            },
            dev: {
                options: {
                    separator: '\n\n'
                },
                src: ['src/scripts/**/**.js'],
                dest: 'builds/development/scripts/app.js'
            }
        },

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
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded'
                },
                files: [{
                    src: 'src/css/styles.scss',
                    dest: 'builds/development/css/styles.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: '3000',
                    base: 'builds/development/index.html',
                    livereload: true
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: ['src/css/**/**.scss', 'src/scripts/**/*.js', 'src/**/*.html'],
                tasks: ['jshint', 'concat', 'sass'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['htmlmin', 'jshint', 'concat', 'sass', 'watch']);
};