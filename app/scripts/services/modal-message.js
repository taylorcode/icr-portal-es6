/**
  * @ngdoc service
  * @name modalMessage
  * @description 
  * A modal service for displaying a message to the user.
  *
 */

export function modalMessage(btfModal) {
	return btfModal({
		controller: 'ModalMessageController as modalMessage',
		templateUrl: 'modal-message'
	})
}

/**
  * @ngdoc controller
  * @name ModalMessage
  * @description 
  * Controller for the message modal service.
  *
 */
 
export class ModalMessage {

	constructor(modalMessage) {
		this.modalMessage = modalMessage
	}


	/**
	 * @ngdoc method
	 * @name ModalMessage#close
	 *
	 * @description
	 * Deactivates the message modal
	 */
	close() {
		this.modalMessage.deactivate()
	}

}
