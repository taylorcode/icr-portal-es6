/**
  * @ngdoc directive
  * @name validateMessage
  * @description 
  * Reduces syntax for angular message by exposing only important settings
  *
 */

export function validateMessage($interpolate, $compile, $templateCache) {
	return {
		restrict: 'A',
		compile: function (elem, attrs) {

			var elementHtml = elem.html(),
				templateName = 'icr-validate-message',
				linkFn

			// initially remove the content from the element to prevent it from being rendered
			elem.empty()

			// makes an request for a template, and finally sets a the linkFn
			// that will return a bound template when invoked with a scope
			templateRequestPromise = $templateRequest(templateName).then(() => {
				
				let interpolated, template

				interpolated = $interpolate(template)({
				  model: {
				    inputName: attrs.icrValidateMessage,
				    content: elementHtml
				  }
				})

				linkFn = $compile(interpolated)

			})

			return function(scope, elem) {
				// after the promise that results in generating a link function,
				// replace the original elements content with the scope-bound html replacement
				templateRequestPromise.then(() => {
					elem.replaceWith(linkFn(scope));
				})

			}

		}
	}
}