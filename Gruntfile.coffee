'use strict'

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->

	# load custom tasks
	grunt.task.loadTasks('custom-tasks')

	# Load grunt tasks automatically
	require('load-grunt-tasks') grunt

	# Time how long tasks take. Can help when optimizing build times
	require('time-grunt') grunt

	# get the main javascript files
	bowerMainJsFiles  = require('main-bower-files')(
		filter: (file) ->
			file.match('.js$')
	)

	# Configurable paths for the application
	appConfig =
		app: require('./bower.json').appPath or 'app'
		dist: 'dist'

	# Define the configuration for all the tasks
	grunt.initConfig

		# Project settings
		yeoman: appConfig

		domain: 'https://www.icracked.com/public'

		# Watches files for changes and runs tasks based on the changed files
		watch:

			coffee:
				files: ['<%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}']
				tasks: ['newer:coffee:dev']

			coffeeTest:
				files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}']
				tasks: [
					'newer:coffee:test'
					'karma'
				]

			compass:
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}']
				tasks: [
					'compass:server'
					'autoprefixer'
				]

			gruntfile:
				files: ['Gruntfile.coffee']

			livereload:
				options:
					livereload: true
				files: [
					'<%= yeoman.app %>/{,*/}*.html'
					'.tmp/styles/{,*/}*.css'
					'.tmp/scripts/{,*/}*.js'
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
				
			ngtemplates:
				files: ['<%= yeoman.app %>/views/{,*/}*.html']
				tasks: [
					'ngtemplates'
				]
				
		# Make sure code styles are up to par and there are no obvious mistakes
		jshint:
			options:
				jshintrc: '.jshintrc'
				reporter: require('jshint-stylish')

		# Empties folders to start fresh
		clean:
			dist:
				files: [
					dot: true
					src: [
						'.tmp'
						'<%= yeoman.dist %>/{,*/}*'
						'!<%= yeoman.dist %>/.git*'
					]
				]
			server: '.tmp'

		# Add vendor prefixed styles
		autoprefixer:
			options:
				browsers: ['last 1 version']

			dist:
				files: [
					expand: true
					cwd: '.tmp/styles/'
					src: '{,*/}*.css'
					dest: '.tmp/styles/'
				]

		# Compiles CoffeeScript to JavaScript
		coffee:
			options:
				sourceMap: true
				sourceRoot: ''

			dev:
				files: [
					expand: true
					cwd: '<%= yeoman.app %>/scripts'
					src: '{,*/}*.coffee'
					dest: '.tmp/scripts'
					ext: '.js'
				]

			test:
				files: [
					expand: true
					cwd: 'test/spec'
					src: '{,*/}*.coffee'
					dest: '.tmp/spec'
					ext: '.js'
				]


		# Compiles Sass to CSS and generates necessary files if requested
		compass:
			options:
				sassDir: '<%= yeoman.app %>/styles'
				cssDir: '.tmp/styles'
				generatedImagesDir: '.tmp/images/generated'
				imagesDir: '<%= yeoman.app %>/images'
				javascriptsDir: '<%= yeoman.app %>/scripts'
				fontsDir: '<%= yeoman.app %>/styles/fonts'
				importPath: './bower_components'
				httpImagesPath: '../../app/images' # NOTE modified settings
				httpGeneratedImagesPath: '/images/generated'
				httpFontsPath: '<%= domain %>/fonts'
				relativeAssets: false
				assetCacheBuster: false
				raw: 'Sass::Script::Number.precision = 10\n'
				#require: 'sass-globbing'

			dist:
				options:
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
			server:
				options:
					debugInfo: true # NOTE - do we need / even want this?


		# Renames files for browser caching purposes
		filerev:
			dist:
				src: [
					'<%= yeoman.dist %>/scripts/{,*/}*.js'
					'<%= yeoman.dist %>/styles/{,*/}*.css'
					'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
					'<%= yeoman.dist %>/styles/fonts/*'
				]

		cssmin:
			dist:
				files:
					'<%= yeoman.dist %>/styles/main.css': ['.tmp/styles/{,*/}*.css']

		uglify:
			options:
				mangle: false
			dist:
				files:
					'<%= yeoman.dist %>/scripts/scripts.js': ['.tmp/scripts/{,*/}*.js'] # application scripts
					'<%= yeoman.dist %>/scripts/vendor.js': bowerMainJsFiles # vendor scripts

		imagemin:
			dist:
				files: [
					expand: true
					cwd: '<%= yeoman.app %>/images'
					src: '{,*/}*.{png,jpg,jpeg,gif}'
					dest: '<%= yeoman.dist %>/images'
				]

		svgmin:
			dist:
				files: [
					expand: true
					cwd: '<%= yeoman.app %>/images'
					src: '{,*/}*.svg'
					dest: '<%= yeoman.dist %>/images'
				]

		htmlmin:
			dist:
				options:
					collapseWhitespace: true
					conservativeCollapse: true
					collapseBooleanAttributes: true
					removeCommentsFromCDATA: true
					removeOptionalTags: true

				files: [
					expand: true
					cwd: '<%= yeoman.dist %>'
					src: [
						'*.html'
						'views/{,*/}*.html'
					]
					dest: '<%= yeoman.dist %>'
				]

		# Replace Google CDN references
		cdnify:
			dist:
				html: ['<%= yeoman.dist %>/*.html']


		# Copies remaining files to places other tasks can use
		copy:
			dist:
				files: [
						expand: true
						dot: true
						cwd: '<%= yeoman.app %>'
						dest: '<%= yeoman.dist %>'
						src: [
							'*.{ico,png,txt}'
							'.htaccess'
							'*.html'
							'views/{,*/}*.html'
							'images/{,*/}*.{webp}'
							'fonts/*'
						]
					,
						expand: true
						cwd: '.tmp/images'
						dest: '<%= yeoman.dist %>/images'
						src: ['generated/*']
				]

			styles:
				expand: true
				cwd: '<%= yeoman.app %>/styles'
				dest: '.tmp/styles/'
				src: '{,*/}*.css'


		# Convert JSON to Sass maps
		shared_config:
			components:
				options:
					name: 'components'
					useSassMaps: true
				src: 'app/json/components.json'
				dest: [
					'app/styles/_components.scss'
				]


    # Run some tasks in parallel to speed up the build process
		concurrent:
			server: [
				'coffee:dev'
				'compass:server'
			]
			test: [
				'coffee'
				'compass'
			]
			dist: [
				'coffee'
				'compass:dist'
				'imagemin'
				'svgmin'
			]
		# Test settings
		karma:
			unit:
				configFile: 'test/karma.conf.coffee'
				singleRun: true
				
		iconizr:
			options:
				prefix: 'svg-nodims'
				dims: true # gives us the dimensions
				padding: 1
				recursive: false # useful if you want to put sets of images in folders and have the folder names attached to those icons
				render:
					css: false
					scss: 'sass/'
			build:
				src: 'app/images/svg'
				dest: 'app/images/svg-output'

		ngtemplates:
			dev:
				cwd: 'app/views'
				src: '**.html'
				dest: '.tmp/scripts/templates.js'
				options:
					url: (url) -> url.replace('.html', '')
					module: 'icrPortalApp:templates'
					standalone: true

	grunt.registerTask 'dev', 'Compile then start a connect web server', (target) ->
		if target is 'dist'
			return grunt.task.run([
				'build'
				'connect:dist:keepalive'
			])
		grunt.task.run [
			'shared_config'
			'clean:server'
			'concurrent:server'
			'autoprefixer'
			'ngtemplates'
			'watch'
		]
		return

	grunt.registerTask 'test', [
		'clean:server'
		'concurrent:test'
		'autoprefixer'
		'karma'
	]
	grunt.registerTask 'build', [
		'clean:dist'
		'concurrent:dist'
		'autoprefixer'
		'ngtemplates'
		'uglify'
		'copy:dist'
		'cdnify'
		'cssmin'
		'filerev'
		'htmlmin'
	]
	grunt.registerTask 'default', [
		'newer:jshint'
		'test'
		'build'
	]
	return