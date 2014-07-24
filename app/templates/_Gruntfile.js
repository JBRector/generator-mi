module.exports = function(grunt) {
    'use strict';

    var paths = {
        src: 'src',
        build: 'release'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jbr: paths,

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9', 'ie 8']
            },

            non_ie: {
                src: '<%= jbr.src %>/assets/css/main.css',
                dest: '<%= jbr.build %>/assets/css/main.css'
            },

            ie: {
                src: '<%= jbr.build %>/assets/css/ie.css'
            }
        },

        clean: ['<%= jbr.build %>'],

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= jbr.src %>',
                    hostname: 'localhost',
                    open: true,
                    livereload:true
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten:true,
                        filter: 'isFile',
                        src: ['<%= jbr.src %>/assets/fonts/**'],
                        dest: '<%= jbr.build %>/assets/fonts/'
                    },
                    {
                        expand:true,
                        flatten:true,
                        filter: 'isFile',
                        src:['<%= jbr.src %>/assets/images/**'],
                        dest:'<%= jbr.build %>/assets/images/'
                    },
                    {
                        expand:true,
                        filter: 'isFile',
                        flatten:true,
                        src:'<%= jbr.src %>/*.html',
                        dest:'<%= jbr.build %>/'
                    }
                ]
            }
        },

        imageoptim: {
            main: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['<%= jbr.build %>/assets/images']
            }
        },

        livereload: {
            // 35729 Default livereload listening port.
            port: 9001
        },

        modernizr: {
            dist: {
                'devFile': '<%= jbr.src %>/assets/js/vendor/modernizr/modernizr.js',
                'outputFile': '<%= jbr.build %>/assets/js/vendor/modernizr/modernizr.js',
                'extra': {
                    'shiv': true,
                    'printshiv': false,
                    'load': false,
                    'mq': false,
                    'cssclasses': true
                },
                'parsefiles': false,
                'files': {
                    'src':['<%= jbr.build %>/assets/js/site.js', '<%= jbr.build %>/assets/css/main.css']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= jbr.src %>/assets/css/main.css' : '<%= jbr.src %>/assets/scss/main.scss'
                }
            },
            dev: {
                files: {
                    '<%= jbr.src %>/assets/css/main.css' : '<%= jbr.src %>/assets/scss/main.scss'
                }
            }
        },

        split_styles: {
            ie: {
                options: {
                    pattern: /\.lt-ie[8|9]/,
                    output:'<%= jbr.build %>/assets/css/ie.css'
                },
                files: {
                    '<%= jbr.src %>/assets/css/main.css': '<%= jbr.src %>/assets/css/main.css'
                }
            }
        },

        useminPrepare: {
            html: ['<%= jbr.src %>/*.html'],
            options: {
                dest: '<%= jbr.build %>'
            }
        },

        usemin: {
            html: ['<%= jbr.build %>/*.html']
        },

        watch: {
            sass: {
                files: ['<%= jbr.src %>/assets/scss/*', '<%= jbr.src %>/assets/scss/base/*', '<%= jbr.src %>/assets/scss/global/*', '<%= jbr.src %>/assets/scss/modules/*', '<%= jbr.src %>/assets/scss/pages/*'],
                tasks: ['sass:dev']
            },

            options: {
                livereload:true
            },

            livereload: {
                files: [
                    '<%= jbr.src %>/*.html',
                    '<%= jbr.src %>/assets/js/{,*/}*.js',
                    '<%= jbr.src %>/assets/images/{,*/}*.{png,jpg,jpeg,webp,gif}']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Run grunt server to start a local development server with node
    grunt.registerTask('server', [
        'sass:dev',
        'connect',
        'livereload-start',
        'watch'
    ]);

    // Use default task for compiling production files
    grunt.registerTask('default', [
        'clean',
        'sass:dist',
        'split_styles:ie',
        'autoprefixer',
        'copy',
        'imageoptim',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin',
        'modernizr'
    ]);

};
