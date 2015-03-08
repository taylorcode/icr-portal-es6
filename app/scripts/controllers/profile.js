/**
 * @ngdoc controller
 * @name Profile
 *
 * @description
 * Displays the user's account information and allows them to edit it,
 * also alllows them to change their profile image. The view lets the
 * user know if they have edited their information and have not saved it
 * when navigating to a different state.
 * 
 */

export class Profile {

	constructor($scope, $state, userData, modalConfirm, imageCanvasShinker, icrUiMessengerDelegate, icrStore) {
		this.$scope = $scope
		this.$state = $state
		this.user = userData
		this.modalConfirm = modalConfirm
		this.$upload = $upload
		this.imageCanvasShinker = imageCanvasShinker
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
		this.icrStore = icrStore
		this.uploading = false // initially we're not uploading anything
		// pull the user's picture from the shared data store
		this.picture = this.icrStore.get('profilePicture')
		// handle firstName + lastName from the server, or just fullName
		if(!this.user.fullName) {
			this.user.fullName = `${this.userData.firstName} ${this.userData.lastName}`
		}
		// monitor the state changing to let the user know that they may be discarding unsaved changes
		this.$scope.$on('$stateChangeStart', this._onViewLeave.bind(this))
	}

	/**
	 * @ngdoc method
	 * @name Profile#uploadProfileImage
	 *
	 * @description
	 * Compresses the image that the user has selected using the `imageCanvasShrinker` service,
	 * and uploads the image to associate with their profile.
	 *
	 * @param {File} file A file blob from the client that is a profile image for the user
	 */
	uploadProfileImage(file) {
		this.imageCanvasShinker.downsize(file)
		.then((imageData) => {
			// assign the image preview back to the view
			this.picture.fullResolution = imageData.url
			this.uploading = true
			portalApis.uploadProfilePicture(imageData.file)
			.progress((evt) => {
				this.percentUploaded = parseInt(100.0 * evt.loaded / evt.total)
			})
			.success((pictureData) => {
				// RELEASENOTE REFACTOR so all use stores?
				this.icrStore.set('profilePicture', pictureData)
			})
			.error(() => {
				// FEATURE wrap in icrUiMessengerDelegate to display a failure message to the user
				console.warn('iCracked: there was an image upload error.')
			})
			.finally(() => {
				this.uploading = false
			})
		})
	}

	/**
	 * @ngdoc method
	 * @name Profile#_onViewLeave
	 * @private
	 *
	 * @description
	 * Called when the user attempts to navigate to a different state. Checks if
	 * the user has modified any information in their account. If they have, it
	 * prompts them using a confirm dialog. If they choose to discard their changes,
	 * they are navigated to the state they were attempting to go to.
	 *
	 * @param {Event} event The event object for the state transition
	 * @param {Object} a ui-router state object for the state the user is attempting to transition to
	 */
	_onViewLeave(event, toState) {
		if(this.$scope.profileDetailsForm.modified) {
			event.preventDefault()
			this.modalConfirm.confirm({
				header: 'You have unsaved changes',
				message: 'Do you want to discard your changes?'
			}, () => {
				this.$state.go(toState)
			})
		}
	}


	/**
	 * @ngdoc method
	 * @name Profile#saveProfileInfo
	 *
	 * @description
	 * Saves the user's update profile information. Only sends the fields that
	 * are modified using `$updateModified`.
	 *
	 * @param {Object} user Contains the users information such as full name, phone number
	 */
	saveProfileInfo(user) {
		this.$scope.profileDetailsForm.$setPristine()
		this.icrUiMessengerDelegate.wrap(this.userData.$updateModified(), 
			'user account information save requested', 
			'user account information saved')
	}

}