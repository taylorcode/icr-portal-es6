/**
  * @ngdoc service
  * @name modalConfirm
  * @description 
  * A modal instance that operates like the native confirm method. Provides
  * callbacks for when the user proceeds or cancels.
  *
 */

export function modalConfirm(btfModal) {
	
	modal = btfModal({
		controller: 'ModalConfirmCtrl as modalConfirm',
		templateUrl: 'modal-confirm'
	})

	/**
	 * @ngdoc method
	 * @name modalConfirm#confirm
	 *
	 * @description
	 * Opens the modal, an provides the ability to configure callbacks
	 * for if the user confirms or denys.
	 *
	 * @param {Object} scopeProps An object that will be applied to the scope of the modal
	 * @param {Function} onYes A callback to indicate that the user wishes to proceed or confirm
	 * @param {Function} onNo A callback to indicate that the user does not want to proceed or confirm
	 */
	modal.confirm = function(scopeProps, onYes, onNo) {
		// activate the modal
		this.activate.call(this, scopeProps)
		// store the yes and no callbacks
		this.onYes = () => {
			onYes(...args)
			this.deactivate()
		}

		this.onNo = () => {
			onNo(...args)
			this.activate()
		}
	}

	return modal
}

/**
  * @ngdoc controller
  * @name ModalConfirm
  * @description 
  * A controller that uses the `modalConfirm` service to expose
  * functionality of a confirm modal.
  *
 */
export class ModalConfirm() {
	
	constructor(modalConfirm) {
		this.modalConfirm = modalConfirm
	}

	/**
	 * @ngdoc method
	 * @name ModalConfirm#close
	 *
	 * @description
	 * Deactivates the modal instance.
	 */
	close() {
		this.modalConfirm.deactivate()
	}

	/**
	 * @ngdoc method
	 * @name ModalConfirm#continue
	 *
	 * @description
	 * Invokes the `onYes` callback supplied when using the `modalConfirm` service
	 */
	continue() {
		this.modalConfirm.onYes()
	}

	/**
	 * @ngdoc method
	 * @name ModalConfirm#stop
	 *
	 * @description
	 * Invokes the `onNo` callback supplied when using the `modalConfirm` service
	 */
	stop() {
		this.modalConfirm.onNo()
	}

}