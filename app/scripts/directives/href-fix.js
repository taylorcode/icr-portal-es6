/**
  * @ngdoc directive
  * @name hrefFix
  * @description 
  * Corrects for ui-router override of href behaviour for accessing external domains
  *
 */

export function hrefFix($location) {
    return {
        link: function(scope, elem) {
            var APP_ROOT = 'portal' // TODO make constant
            elem.click(function() {
                var href = elem.attr('href'),
                	isAbsolute = new RegExp('^(?:[a-z]+:)?//', 'i')
                if (!href || elem.attr('ui-sref') || isAbsolute.test(href)) {
                    return
                }
                if (href.charAt(0) === '/') {
                    href = href.substr(1)
                }
                if (href.lastIndexOf(APP_ROOT, 0) !== 0) {
                    return
                }
                event.preventDefault()
                $location.url(elem.attr('href'))
            })
        }
    }
}