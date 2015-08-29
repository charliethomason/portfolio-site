(function() {
	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				build: {
					options: {
						style: 'compressed',
						sourcemap: 'none'
					},
					files: {
						'build/css/main.css': 'src/scss/main.scss'
					}
				}
			},
			uglify: {
				options: {
					mangle: false
				},
				build: {
					files: {
						'build/js/main.js': ['src/js/scripts.js']
					}
				}
			},
			assemble: {
				options: {
					flatten: true,
					assets_css: 'css',
					assets_js: 'js'
				},
				prod: {
					options: {
						layout: 'src/layouts/layout.hbs',
						partials: ['src/partials/**/*.hbs'],
						data: [
							'src/data/*.json'
						]
					},
					files: {
						'build/': ['src/pages/*.hbs']
					}
				}
			},
			copy: {
				img_build: {
					files: [{
						expand: true,
						cwd: 'src/img/',
						src: ['**/*'],
						dest: 'build/img/'
					}]
				},
				js_lib: {
					files: [{
						expand: true,
						cwd: 'src/js/lib/',
						src: ['**'],
						dest: 'build/js'
					}]
				}
			},
			connect: {
        server: {
            options: {
                port: 9000,
                base: 'build',
                hostname: '*'
            }
        }
			},
			watch: {
				css: {
					files: ['src/scss/*.scss'],
					tasks: ['sass']
				},
				js: {
					files: ['src/js/scripts.js'],
					tasks: ['uglify']
				},
				js_lib: {
					files: ['src/js/lib/*.js'],
					tasks: ['copy:js_lib']
				},
				html: {
					files: ['src/layouts/*.hbs', 'src/pages/*.hbs', 'src/partials/*.hbs', 'src/data/*.json'],
					tasks: ['assemble']
				},
				img: {
					files: ['src/img/*'],
					tasks: ['copy:img_build']
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('assemble');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-connect');

		grunt.registerTask('default', [
			'sass',
			'assemble',
			'uglify',
			'copy',
			'connect',
			'watch'
		]);
	};
}());