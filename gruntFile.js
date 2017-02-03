/* jshint ignore:start */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: {
      // Configurable paths
      app:  'app',
      src:  'app/src',
      auto: 'app/src/auto',
      test: 'test',
      dist: 'dist',
      projectName: 'SentenTree'
    },

    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          mainConfigFile: '<%= yeoman.src %>/config.js',
          baseUrl: '<%= yeoman.src %>',
          name: 'main',
          out:  '<%= yeoman.dist %>/app-packed.js',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: true,
          useStrict: false,
          wrap: true,
          uglify2: {}
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      // default options
      options: {
        livereload: true
      },
      sass: {
        // compile but do not trigger reload
        options: {
          livereload: false
        },
        files: ['<%= yeoman.src %>/**/*.scss'],
        tasks: ['compass:dev'],
      },
      images:{
        files: ['<%= yeoman.src %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'],
        tasks: []
      },
      htmlPartials:{
        // compile but do not trigger reload
        options: {
          livereload: false
        },
        files: [
          '<%= yeoman.src %>/**/*.html'
        ],
        tasks: ['ngtemplates']
      },
      others: {
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.src %>/**/*.js'
        ],
        tasks: [],
      },
      // watch after it has been compiled and reload
      // (will make the browser reload only css)
      css: {
        files: ['<%= yeoman.src %>/auto/{,*/}*.css'],
        tasks: []
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= yeoman.dist %>/*']
        }]
      },
      auto: {
        files: [{
          dot: true,
          src: ['<%= yeoman.auto %>/*']
        }]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to 'localhost' to access the server only from the same computer
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      dev: {
        options: {
          sassDir: '<%= yeoman.src %>',
          cssDir: '<%= yeoman.src %>/auto',
          generatedImagesDir: '<%= yeoman.src %>/../images/generated',
          imagesDir: '<%= yeoman.src %>/../images',
          javascriptsDir: '<%= yeoman.src %>',
          fontsDir: '<%= yeoman.src %>/stylesheets/fonts',
          importPath: '<%= yeoman.src %>/../bower_components',
          httpImagesPath: '/images',
          httpGeneratedImagesPath: '/images/generated',
          httpFontsPath: '/styles/fonts',
          relativeAssets: false,
          assetCacheBuster: false
          // specify: 'ddg.scss'
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    htmlmin: {
      dist: {
        options: {
          removeComments: true
          // collapseBooleanAttributes: true,
          // collapseWhitespace: true,
          // removeAttributeQuotes: true,
          // removeCommentsFromCDATA: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/partials',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>/partials'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/app.min.css': [
            '<%= yeoman.src %>/auto/app/app.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/app-packed.min.js': [
            '<%= yeoman.dist %>/app-packed.js'
          ]
        },
        options:{
          report: 'min',
          mangle: false,
          // compress: true,
          preserveComments: 'some'
        }
      }
    },

    ngtemplates:  {
      app:{
        cwd:      '<%= yeoman.src %>',
        src:      'app/{,*/}{,*/}{,*/}{,*/}{,*/}{,*/}*.html',
        dest:     '<%= yeoman.src %>/auto/templates.js',
        // dest:     '<%= yeoman.dist %>/scripts/templates.js',
        options: {
          htmlmin: { removeComments: true },
          // prefix: '/src/',
          bootstrap: function(module, script){
            var str = "// DEAR BRAVE DEVELOPER, \n";
            str += "// THIS FILE IS AUTO-GENERATED FROM GRUNT, SO DO NOT MODIFY ANYTHING\n";
            str += "// UNLESS YOU WANT TO WASTE YOUR EFFORT OR REALLY KNOW WHAT YOU ARE DOING.\n";
            str += "// WITH LOVE, \n";
            str += "// -- The person who creates this file.\n"
            str += "\n\n";
            str += "define(['app/app'], function(app){ app.getNgModule().run(['$templateCache', function($templateCache){ " + script + "}]); });";
            return str;
          }
        }
      }
    }

  });

  //---------------------------------------------------
  // Register all tasks
  //---------------------------------------------------

  grunt.registerTask('compile', 'Compile css and whatever that needs to be compile', [
    'compass:dev',
    'ngtemplates'
  ]);

  grunt.registerTask('develop', 'Run development watchdog that look for changes, compile and trigger livereload.', [
    'compile',
    'watch'
  ]);

  grunt.registerTask('serve', 'Start server and also watch for changes and livereload', [
    'compile',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', 'Bundle code for production', [
    'compile',

    // clean output directory
    'clean:dist',

    // package javascript
    'requirejs:dist',

    // uglify the javascript
    // 'uglify:dist',

    // minify css
    'cssmin:dist'
  ]);

  // Default task
  grunt.registerTask('default', [
    'serve'
  ]);

};
