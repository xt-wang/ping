module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            foo: {
                src: ['src/aa.js', 'src/aaa.js']
            },
        },
        transport: {
            dialog: {
                files: [{
                    src: '*',
                    dest: '.build/styles/component/dialog/src'
                }]
            },
            foo: {
                // concat task "foo" target options and files go here.
            },
            bar: {
                // concat task "bar" target options and files go here.
                options: {
                    // "foo" target options may go here, overriding task-level options.
                },
                files: [{
                    src: ['src/bb.js', 'src/bbb.js'],
                    dest: 'dest/b/',
                    nonull: true
                }, {
                    src: ['src/bb1.js', 'src/bbb1.js'],
                    dest: 'dest/b1/',
                    filter: 'isFile'
                }, ],
            }
        },
        concat: {
            files: [{
                src: ['src/bb.js', 'src/bbb.js'],
                dest: 'dest/b/',
                nonull: true
            }, {
                src: ['src/bb1.js', 'src/bbb1.js'],
                dest: 'dest/b1/',
                filter: 'isFile'
            }, ],
            dialog: {
                files: {
                    "dist/styles/component/dialog/src/dialog.js": [".build/styles/component/dialog/src/dialog.js"]
                }
            }
        },
        uglify: {
            // uglify task configuration goes here.
        },
        clean: {
            foo: {
                src: ['tmp/**/*'],
                filter: 'isFile',
            },
        },
        // Arbitrary non-task-specific properties.
        my_property: 'whatever',
        my_src_files: ['foo/*.js', 'bar/*.js'],
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('build', ['transport', 'concat']);
    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};