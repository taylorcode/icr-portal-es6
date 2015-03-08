/**
 * @ngdoc controller
 * @name BillingEdit
 *
 * @description
 * Handles updating the user's credit card information
 * 
 */

export class BillingEdit {

	constructor(cardData, modalBilling, $state, $scope, icrUiMessengerDelegate, stripe, portalApis) {
		this.card = cardData
		this.modalBilling = modalBilling
		this.$state = $state
		this.$scope = $scope
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
		this.stripe = stripe
		this.portalApis = portalApis
		// RELEASENOTE REFACTOR
		/*
		@$scope.$on 'btfModal', (event, data) =>
			@$state.go '^' if data.modal is @modalBilling and not data.active
		# bind here is an artifact, because the method gets attached to the scope in btf-modal service without considering binding
		@modalBilling.activate(card: @cardData, onUpdate: @update.bind @)
		*/
		// initially activate the billing modal
		this.modalBilling.activate({
			card: this.card,
			onUpdate: this.updateCreditCard.bind(this)
		})
	}

	/**
	 * @ngdoc method
	 * @name BillingEdit#updateCreditCard
	 *
	 * @description
	 * Updates the user's credit card using Stripe
	 * 
	 * @param {Object} card Credit card information gathered from user input
	 */
	updateCreditCard(card) {


		let formattedCardNumber, splitExp, updateCardPromise

		splitExp = card.expiry.split('/')

		formattedCardNumber = {
		  number: card.number,
		  cvc: card.cvc,
		  exp_month: splitExp[0],
		  exp_year: splitExp[1]
		}

		updateCardPromise = this.stripe.card.createToken(formattedCardNumber)

		.then((token) => {

		    return this.portalApis.billing.update({
		      token: token.id
		    }).$promise

		})

		this.icrUiMessengerDelegate.wrap(updateCardPromise, 'saving card information', 'user card information saved').then(() => {
			this.modalBilling.deactivate()
			this.$state.go('^')
		})

	}

}


