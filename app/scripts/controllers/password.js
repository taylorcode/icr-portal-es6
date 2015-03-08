/**
 * @ngdoc Password
 * @name Notifications
 *
 * @description
 * Allows the user to update their account password
 * 
 */

export class Password {

	constructor($scope, portalApis, icrUiMessengerDelegate, modalMessage) {
		this.$scope = $scope
		this.portalApis = portalApis
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
		this.modalMessage = modalMessage
		this.password = ''
	}

	/**
	 * @ngdoc method
	 * @name Password#updatePassword
	 *
	 * @description
	 * Sends the users old and new password to the server to update with the new password and
	 * displays a success or failure message, depending on if their original password is correct
	 */
	updatePassword(password) {
		this.icrUiMessengerDelegate.wrap(this.portalApis.password.update(password).$promise, 'change password requested', 'password successfully changed', 'incorrect password')
		.then(() => {
			this.password = ''
		})
		.finally(() => {
			this.$scope.updatePasswordForm.$setPristine()
		})
	}

}