export class PlanIssues {

	constructor ($scope, $state, modalIssues) {
		this.$scope = $scope
		this.$state = $state
		this.modalIssues = modalIssues
		// RELEASENOTE REFACTOR
		// NOTE proposed service to replace proprietary logic below
		// modalBilling.on 'deactivate', -> @$state.go '^'
		this.$scope.$on('btfModal', (event, data) => {
			// the current modal is modal issues and it is not active
			if(data.modal === this.modalIssues && !data.active) {
				this.$state.go('^')
			}
		})

		// RELEASENOTE REFACTOR move into router
		this.modalIssues.activate()
	}

}

