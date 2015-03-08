/**
  * @ngdoc service
  * @name PlanHelper
  * @description 
  * Provides methods for filtering an array of plans by current or past
  * based on their status.
  *
 */

export class PlanHelper {

	/**
	 * @ngdoc method
	 * @name PlanHelper#isEnabled
	 *
	 * @description
	 * Determines if a plan is enabled base on its status. Cancelled or 
	 * expired plans are past plans, while all other statuses are current plans.
	 * 
	 * @param {Object} plan The plan in question to determine if it is enabled.
	 * @returns {boolean} the enabled state of the plan.
	 */
	isEnabled(plan) {
		return plan.status !== 'cancelled' && plan.status !== 'expired'
	}

	/**
	 * @ngdoc method
	 * @name PlanHelper#filterCurrent
	 *
	 * @description
	 * Filters an array of plans.
	 * 
	 * @param {Object} plan The plans in question to determine which are current plans
	 * @returns {Array} An array of current plans
	 */
	filterCurrent(plans) {
		return plans.filter((plan) => {
			return this.isEnabled(plan)
		})
	}

	/**
	 * @ngdoc method
	 * @name PlanHelper#filterPast
	 *
	 * @description
	 * Filters an array of plans.
	 * 
	 * @param {Object} plan The plans in question to determine which are past plans
	 * @returns {Array} an array of past plans
	 */
	filterPast(plans) {
		return plans.filter((plan) => {
			return !this.isEnabled(plan)
		})
	}

}
