/**
  * @ngdoc directive
  * @name billingPlanSummary
  * @description 
  * Billing plan summary displays a summary of a billing plan. Takes in billing
  * summary information and displays them in a view.
  *
 */

export function billingPlanSummary() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			billingPlan: '=icrVBillingPlan'
		}
		templateUrl: 'billing-plan-summary'
	}
}