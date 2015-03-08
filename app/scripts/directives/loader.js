/**
  * @ngdoc directive
  * @name icrMainLoader
  * @description 
  * UI loading directive, which is displayed when http requests are pending.
  *
 */

export function icrMainLoader () {
	return {
		restrict: 'E',
		templateUrl: 'icr-main-loader'
	}
}