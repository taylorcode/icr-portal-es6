module.exports = (grunt) ->
	grunt.registerTask 'iconizr-helper', 'merges the dimensions with the classes', ->

		classesScss = ''

		grunt.file.expand('app/images/svg/**/*.svg').forEach (path, index) ->
			if(path)
				pathParts = path.split('/')
				className = path.split('/')[pathParts.length - 1].split('.svg')[0]
				classesScss += '\n' if index isnt 0
				# group the dimensions with the class
				classesScss += '.svg-' + className + '\n' + '\t@extend .svg-nodims-' + className + '\n' + '\t@extend .svg-nodims-' + className + '-dims\n'

		grunt.file.write('app/styles/_icons-merged.sass', classesScss)