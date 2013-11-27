module.exports = function (grunt) {

    grunt.loadNpmTasks ('grunt-mocha-test');
    grunt.loadNpmTasks ('grunt-dox');
    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-uglify');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'app.js' ]
        },

        dox: {
            options: {
                title: "LAS Instrumentation Documentation"
            },
            files: {
                src: [ 'lib', 'routes', 'public/javascripts' ],
                dest: 'docs'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/test_*.js']
            }
        },

        uglify: {
            my_target: {
                files: {
                    'public/javascripts/app.min.js': [
			'public/javascripts/lib/*.js',
			'public/javascripts/*.js'
		    ]
                }
            }
        }

    });
    grunt.registerTask('default', [ 'jshint', 'mochaTest', 'uglify' ]);
};
