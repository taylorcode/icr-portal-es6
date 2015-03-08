/**
 * @ngdoc controller
 * @name Dashboard
 *
 * @description
 * Displays current information to user such as updates, transaction progress, notifications
 * 
 */

export class Dashboard {

	constructor(activitiesData) {
		this.activities = activitiesData
	}

}