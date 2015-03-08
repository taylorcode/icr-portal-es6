/**
  * @ngdoc controller
  * @name LoadingDialog
  * @description 
  * Controls the user's login process.
  *
 */

class LoadingDialog {

	constructor($element, icrUiMessengerDelegate, AuthService, $state, $scope, $animate) {
		this.$element = $element
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
		this.AuthService = AuthService
		this.$state = $state
		this.$scope = $scope
		this.$animate = $animate
		this.failureCssClass = 'icr-failure'
		this.credentials = {}
	}

	/**
	 * @ngdoc method
	 * @name LoadingDialog#login
	 *
	 * @description
	 * Issues a request to log the user in. If successful, the `loginSuccess` method is called
	 * otherwise, the `loginFailure` method is called.
	 *
	 * @param {Object} credentials The user's credentials for logging in
	 */
	login(credentials) {

		this.$element.removeClass(this.failureCssClass)

		this.icrUiMessengerDelegate.wrap(this.AuthService.login(credentials), 'logging in...', 'login success!', 'login failed!')
		.then(this.loginSuccess)
		.catch(this.loginFailure)
		.finally(() => {
			this.$scope.loginForm.$setPristine()
		})
	}

	/**
	 * @ngdoc method
	 * @name LoadingDialog#loginSuccess
	 *
	 * @description
	 * Called when the user successfully logs in. Transitions the user to the `membership` state.
	 */
	loginSuccess() {
		this.$state.go('membership')
	}

	/**
	 * @ngdoc method
	 * @name LoadingDialog#loginFailure
	 *
	 * @description
	 * Called when the login fails, adds a failure class using the `$animate` service.
	 */
	loginFailure() {
		this.$animate.addClass(this.$element, this.failureCssClass)
	}

}

/**
  * @ngdoc directive
  * @name loginDialog
  * @description 
  * A dialog for displaying a login form.
  *
 */

export function loginDialog() {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'icr-main-loading-dialog',
		controller: 'LoadingDialogController as loadingDialog'
	}
}