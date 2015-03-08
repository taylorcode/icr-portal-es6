/**
  * @ngdoc controller
  * @name BillingDialog
  * @description 
  * Controls updating the user's billing information.
  *
 */

export class BillingDialog {

	constructor($scope) {
		this.$scope = $scope
	}

	/**
	 * @ngdoc method
	 * @name BillingDialog#updateCreditCard
	 *
	 * @description
	 * Issues a request to the function on the controller of the billing dialog directive
	 * to a method (in this case, on the edit billing controller).
	 *
	 * @param {Object} card The plain text credit card information
	 */
	updateCreditCard(card) {
		let updatePromise = this.onUpdate({card: card})

		updatePromise.then(() => {
			this.$scope.cardForm.$setPristine()
		})
	}

}

/**
  * @ngdoc directive
  * @name billingDialog
  * @description 
  * Dialog for updating the user's billing information.
  *
 */

export function billingDialog() {
	return {
		restrict: 'A',
		templateUrl: 'icr-main-billing-dialog',
		scope: {
			card: '=icrVCardData',
			onUpdate: '&icrVOnUpdate'
		},
		bindToController: true,
		controller: 'BillingDialogController as billingDialog'
	}
}