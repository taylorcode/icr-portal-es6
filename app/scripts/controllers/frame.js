/**
 * @ngdoc controller
 * @name Frame
 *
 * @description
 * The frame that contains application-level services and data models
 * 
 */

export class Frame {

	constructor(icrStore, $scope) {
		this.icrStore = icrStore
		this.picture = this.icrStore.get('profilePicture')
		this.$scope = $scope
		// data model passed into the account menu for controlling it's state
		this.accountMenu = {
			visible: false
		}
		// when the state is changed, make sure to close the menu to not annoy the user
		this.$scope.$on('$stateChangeSuccess', () => {
			this.accountMenu.visible = false
		})
	}

}