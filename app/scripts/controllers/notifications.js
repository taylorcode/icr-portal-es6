/**
 * @ngdoc controller
 * @name Notifications
 *
 * @description
 * Displays the user's notification settings and allows the user to edit the settings
 * 
 */

export class Notifications {

	constructor(notificationsData, icrUiMessengerDelegate) {
		this.notifications = notificationsData
		this.icrUiMessengerDelegate = icrUiMessengerDelegate
		this.notificationsOff = false
	}

	/**
	 * @ngdoc method
	 * @name Notifications#getFlatNotifications
	 *
	 * @description
	 * Produces an array of the notifications for simple processing
	 *
	 * @returns Array an array with notification options
	 */

	getFlatNotifications() {
		return this.notifications.updates.concat(this.notifications.activities)
	}

	/**
	 * @ngdoc method
	 * @name Notifications#disableNotifications
	 *
	 * @description
	 * Goes through each notification and disables it by setting it's selected property to false
	 */
	disableNotifications() {
		this.getFlatNotifications().forEach((notification) => {
			notification.selected = false
		})
	}

	/**
	 * @ngdoc method
	 * @name Notifications#disableNotificationsOff
	 *
	 * @description
	 * Disables the notifications off option, called when any of the notifications are turned on
	 */
	disableNotificationsOff() {
		this.notificationsOff = false
	}

	/**
	 * @ngdoc method
	 * @name Notifications#updateSettings
	 *
	 * @description
	 * Sends the notification settings to be saved, and displays a success or failure message to the user
	 */
	updateSettings(notifications) {
		this.icrUiMessengerDelegate.wrap(this.notificationsData.$save(), 'saving your notification settings', 'notification settings saved')
	}

}