/**
  * @ngdoc directive
  * @name billingHistory
  * @description 
  * A component for displaying a user's billing history. Takes in bills
  * and displays them in a list.
  *
 */

export function billingHistory() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			bills: '=icrVBills'
		}
		templateUrl: 'billing-history'
	}
}