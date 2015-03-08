/**
 * @ngdoc controller
 * @name Feedback
 *
 * @description
 * Displays the user's devices
 * 
 */

export class Feedback {

	constructor($scope, portalApis, $state, icrUiMessengerDelegate) {
		this.$scope = $scope
		this.portalApis = portalApis
		this.$state = $state
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
	}

	/**
	 * @ngdoc method
	 * @name Feedback#sendFeedback
	 *
	 * @description
	 * Sends feedback from the user about the application
	 * 
	 * @param {string} message A feedback message from the user
	 */

	sendFeedback(message) {
		this.icrUiMessengerDelegate.wrap(this.portalApis.feedback.save({
			message: message
		}).$promise)
		.then(() => {
			this.$state.go('feedbackSuccess')
		})
		.finally(() => {
			this.$scope.feedbackForm.$setPristine()
		})
	}
	
}