/**
 * @ngdoc controller
 * @name BillingPlan
 *
 * @description
 * Displays a specific billing plan's information and billing cycle bills
 * 
 */

export class BillingPlan {

	constructor(billingPlanData, billsData) {
		this.billingPlan = billingPlanData
		this.bills = billsData
	}

}