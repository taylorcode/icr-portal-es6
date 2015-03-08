/**
 * @ngdoc controller
 * @name Billing
 *
 * @description
 * Displays the users billing and billing information for a period
 * 
 */

export class Billing {

	constructor(billsData, billingData) {
		this.bills = billsData
		this.billing = billingData
	}

}