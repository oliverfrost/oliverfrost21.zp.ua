module.exports = function (grunt) {
    grunt.initConfig({
        /* Remove builds */
        clean: {
            dev: {
                src: ['builds/development']
            },
            prod: {
                src: ['builds/production']
            }
        },

        /* Validate HTML */
        htmlhint: {
            html1: {
                src: ['src/**/*.html']
            }
        },

        /* Minimize HTML files */
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

        /* Validate JavaScript files */
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['src/server.js', 'src/scripts/**/*.js']
        },

        /* Concatenate and minimize JavaScript files */
        uglify: {
            prod: {
                files: {
                    'builds/production/scripts/app.min.js': ['src/scripts/**/*.js'],
                    'builds/production/server.min.js': ['src/server.js']
                }
            },
            dev: {
                options: {
                    beautify: true
                },
                files: {
                    'builds/development/scripts/app.min.js': ['src/scripts/**/*.js'],
                    'builds/development/server.min.js': ['src/server.js']
                }
            }
        },

        /* Convert SASS to CSS */
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

        /* Do 'tasks' when watched files are changed */
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

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean', 'htmlhint', 'htmlmin', 'jshint', 'uglify', 'sass', 'watch']);
};