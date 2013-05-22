'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/{,*/}*.coffee', '<%= yeoman.app %>/Public/scripts/{,/}*.coffee'],
        tasks: ['coffee:dist']
      },
      jade: {
        files: '<%= yeoman.app %>/Public/{,*/}*.jade',
        tasks: ['jade']
      },
      stylus: {
        files: '<%= yeoman.app %>/Public/{,*/}*.styl',
        tasks: ['stylus']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/Public/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '{.tmp,<%= yeoman.app %>}/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/Public/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/Public/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    express: {
      livereload: {
        options: {
          port: process.env.PORT || 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: process.env.HOST || '0.0.0.0',
          bases: [path.resolve('.tmp/Public'),path.resolve('<%= yeoman.app %>/Public')],
          server: path.resolve('<%= yeoman.dist %>/express.js')
        }
      }
    },
    connect: {
      options: {
        port: process.env.PORT || 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: process.env.HOST || '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '<%= yeoman.app %>/Public')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        files: [{
          dot: true,
          src: [
            'Gruntfile.js',
            '<%= yeoman.app %>/Public/scripts/{,*/}*.js',
            '!<%= yeoman.app %>/Public/scripts/{,*/}*.js'
          ]
        }]
      }
    },
    jade: {
      dist: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: 'Public/{,*/}*.jade',
          ext: '.html'
        }]
      }
    },
    stylus: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: 'Public/{,*/}*.styl',
          ext: '.css'
        }]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: ['Public/scripts/{,*/}*.coffee'],
          dest: '.tmp/',
          ext: '.js'
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.dist %>',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/Public/scripts/scripts.js': [
            '.tmp/Public/scripts/{,*/}*.js',
            '<%= yeoman.app %>/Public/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/Public/index.html',
      options: {
        dest: '<%= yeoman.dist %>/Public'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/Public/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/Public/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>/Public']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/Public/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/Public/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/Public/styles/main.css': [
            '.tmp/Public/styles/{,*/}*.css',
            '<%= yeoman.app %>/Public/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/Public/',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>/Public'
        },{
          expand: true,
          cwd: '.tmp/Public/',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>/Public'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/Public/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/Public/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/Public/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/Public/scripts/scripts.js': [
            '<%= yeoman.dist %>/Public/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/Public/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/Public/styles/{,*/}*.css',
            '<%= yeoman.dist %>/Public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/Public/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'Public/*.{ico,txt}',
            'Public/images/{,*/}*.{gif,webp}',
            'Public/styles/fonts/*'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>/Public',
          src: [
            'express.js'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('original-server', [
    'clean:server',
    'coffee:dist',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
    'jade',
    'stylus',
    'livereload-start',
    //'connect:livereload',
    'express',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'jade',
    'stylus',
    'connect:test'/*,
    'karma'*/
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'coffee',
    'jade',
    'stylus',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['server']);
};
