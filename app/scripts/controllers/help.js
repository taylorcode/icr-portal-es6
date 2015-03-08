/**
 * @ngdoc controller
 * @name Help
 *
 * @description
 * The frame that contains application-level services and data models
 * 
 */

export class Help {

	constructor(zopim) {
		this.zopim = zopim
	}

	/**
	 * @ngdoc method
	 * @name Help#openChat
	 *
	 * @description
	 * Opens the zopim chat bubble to assist the user via live chat.
	 * Only opens in production due the script loading conditionally.
	 * 
	 */
	openChat() {
		let zopimRef = this.zopim()

		if(zopimRef) {
			zopimRef.livechat.badge.show()
		} else {
			console.warn('iCracked: developing locally, zopim not avaliable')
		}
	}
}