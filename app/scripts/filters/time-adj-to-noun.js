/**
  * @ngdoc filter
  * @name timeAdjToNoun
  * @description 
  * Converts singular connotations of times to recurring
  *
 */

export function timeAdjToNoun() {
	return function(prop) {
		let timeMap = {
			'yearly': 'year',
			'monthly': 'month',
			'weekly': 'week',
			'daily': 'day'
		}
		return timeMap[prop] || prop
	}
}