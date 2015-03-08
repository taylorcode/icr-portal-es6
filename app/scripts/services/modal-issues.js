/**
  * @ngdoc service
  * @name modalIssues
  * @description 
  * A modal service for displaying plan issues information.
  *
 */

export function modalIssues(btfModal) {
	return btfModal({
		controller: 'ModalIssuesController as modalIssues',
		templateUrl: 'modal-issues'
	})
}

/**
  * @ngdoc controller
  * @name ModalIssues
  * @description 
  * Controller for the issues modal service.
  *
 */

export class ModalIssues {

	constructor(modalIssues) {
		this.modalIssues = modalIssues
	}

	/**
	 * @ngdoc method
	 * @name ModalIssues#close
	 *
	 * @description
	 * Deactivates the issues modal
	 */
	close() {
		this.modalIssues.deactivate()
	}

}
