/**
  * @ngdoc service
  * @name IcrStore
  * @description 
  * A basic data store that can be used to storing and sharing data across
  * the application.
  *
 */

const dataStore = Name.create()

export class IcrStore {

	constructor() {
		this[dataStore] = {}
	}

	/**
	 * @ngdoc method
	 * @name IcrStore#set
	 *
	 * @description
	 * Stores a value associated with a key nested within an object property
	 * to prevent known issue with references to properties on a prototype chain
	 * 
	 * @param {string} key A lookup name to associate with a value
	 * @param {?} value A value to associate with the key
	 * @returns {?} The value stored
	 */
	set(key, value) {
	    if (!this[dataStore][key]) {
	      this[dataStore][key] = {
	        ref: value
	      }
	    } else {
	      this[dataStore][key].ref = value
	    }
	    return value
	}

	/**
	 * @ngdoc method
	 * @name IcrStore#get
	 *
	 * @description
	 * Provides a value stored by looking up the associated key
	 * 
	 * @param {string} key A lookup name to associate with a value
	 * @returns {?} the value stored
	 */
	get(key) {
		return this[dataStore][key].ref // XXX ref here is returned??
	}

}