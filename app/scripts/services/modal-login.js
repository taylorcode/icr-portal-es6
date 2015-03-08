/**
  * @ngdoc service
  * @name modalLogin
  * @description 
  * A modal service for displaying a login dialog.
  *
 */

export function modalLogin(btfModal) {
	return btfModal({
		controller: 'ModalLoginController as modalLogin',
		templateUrl: 'modal-login'
	})
}

/**
  * @ngdoc controller
  * @name ModalLogin
  * @description 
  * Controller for the login modal service.
  *
 */
 
export class ModalLogin {

	constructor(modalLogin, $scope, AUTH_EVENTS) {
		this.modalLogin = modalLogin
		this.$scope = $scope
		// when loginSuccess event is fired, close the modal
		this.$scope.$on(AUTH_EVENTS.loginSuccess, this.close.bind(this))
	}

	/**
	 * @ngdoc method
	 * @name ModalLogin#close
	 *
	 * @description
	 * Deactivates the login modal
	 */
	close() {
		this.modalLogin.deactivate()
	}

}