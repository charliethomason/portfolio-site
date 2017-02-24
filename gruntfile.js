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
					layout: 'src/layouts/layout.hbs',
					partials: ['src/partials/**/*.hbs'],
					helpers: ['helpers.js'],
					data: [
						'src/data/*.json'
					]
				},
				primary: {
					files: {'build/': ['src/pages/primary/*.hbs']}
				},
				art: {
					files: {'build/art/': ['src/pages/art/*.hbs']}
				},
				photos: {
					files: {'build/photos/': ['src/pages/photos/*.hbs']}
				},
				birds: {
					files: {'build/birds/': ['src/pages/birds/*.hbs']}
				},
				code: {
					files: {'build/code/' : ['src/pages/code/*.hbs']}
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
				},
				css_lib: {
					files: [{
						expand: true,
						cwd: 'src/css/',
						src: ['**'],
						dest: 'build/css/'
					}]
				},
				code_work: {
					files: [{
						expand: true,
						cwd: 'src/pages/code/work/',
						src: ['**/*'],
						dest: 'build/code/work'
					}]
				}
			},
			connect: {
        server: {
            options: {
                port: 9000,
                base: 'build',
                hostname: '*',
                open: true
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
					files: ['src/layouts/*.hbs', 'src/pages/**/*.hbs', 'src/partials/*.hbs', 'src/data/*.json'],
					tasks: ['assemble']
				},
				img: {
					files: ['src/img/**/*'],
					tasks: ['copy:img_build']
				},
				code_work: {
					files: ['src/pages/code/work/**/*'],
					tasks: ['copy:code_work']
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