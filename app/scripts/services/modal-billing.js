/**
  * @ngdoc service
  * @name modalBilling
  * @description 
  * A modal service for displaying billing information.
  *
 */

export function modalBilling(btfModal) {
	return btfModal({
		controller: 'ModalBillingController as modalBilling',
		templateUrl: 'modal-billing'
	})
}

export class ModalBilling {

	constructor(modalBilling) {
		this.modalBilling = modalBilling
	}

	/**
	 * @ngdoc method
	 * @name ModalBilling#close
	 *
	 * @description
	 * Deactivates the billing modal
	 */
	close() {
		this.modalBilling.deactivate()
	}

}