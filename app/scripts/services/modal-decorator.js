/**
  * @ngdoc decorator
  * @name btfModalDecorator
  * @description 
  * Wraps a modal instance so that when it is activated or deactivated, the event is
  * broadcasted to the app through $rootScope.
  *
 */

 export function btfModalDecorator($delegate, $rootScope) {

	/**
	  * @ngdoc function
	  * @name broadcastModalEvent
	  * @description 
	  * Broadcasts an event using the `btfModal` namespace that contains a reference
	  * to the modals instance, and it's state. Used for observing/responding to a 
	  * modals behaviour externally.
	  *
	 */
 	function broadcastModalEvent(state) {
 		return function () {
			$rootScope.$broadcast('btfModal', {
				active: true,
				modal: state
			})
			activateProxy.apply(this, arguments)
 		}
 	}

	// wrap the modal delegate in a function
	return function () {

		let delegateInstance = $delegate.apply(this, arguments)
		var activateProxy = delegateInstance.activate
			deactivateProxy = delegateInstance.deactivate

		delegateInstance.activate = broadcastModalEvent(true)
		delegateInstance.deactivate = broadcastModalEvent(false)

	}
}

