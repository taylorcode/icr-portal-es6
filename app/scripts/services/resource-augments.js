/**
  * @ngdoc service
  * @name ResourceAugments
  * @description 
  * Methods designed to modify or enhance the behaviour of a `$resource` instance,
  * for example, `ResourceAugments.addModified` for the purpose of computing and sending
  * only the changes to a model to the server.
  *
 */

export class ResourceAugments {

  /**
   * @ngdoc method
   * @name ResourceAugments#_trackMaster
   * @private
   *
   * @description
   * Attaches a `$$master` property onto a `$resource` instance, that contains a copy of
   * the original, unmodified value of a resource. This copy is reset when the `method` is called
   * 
   * @param {Object} Resource A resource factory `$resource`, that is going to 
   *   be augmented with a `$$master` property
   * @param {string} method The resource method that when called, will reset the `$$master` copy
   */
  _trackMaster(Resource, method) {
    var proxy = Resource[method]
    Resource[method] = function () {

      let deferrend = proxy.apply(this, arguments),
          promise = this === Resource ? deferrend.$promise : deferrend

      promise.then((resolved) => {
        Resource.$$master = angular.copy(this === Resource ? resolved : this)
        return resolved
      })

      return deferrend
    }
  }

  /**
   * @ngdoc method
   * @name ResourceAugments#addModified
   *
   * @description
   * Attaches a `$updateModified` method on to each instance created from the `Resource` factory
   * that when called, will call the static resource `update` method with only the changes
   * to the data model. Also sets up resetting the `$$master` copy to which the changes are
   * determined from, when any of the `customOperations` or the `operations` defined statically on
   * this class are called (and their promises are resolved)
   * 
   * @param {Object} Resource A resource factory `$resource`, that for each instance produced, will be
   *   augmented with the `$updateModified` method
   * @param {Array} customOperations Operations in addition to the default operations `ResourceAugments.operations`
   *   that will reset the master copy of the model
   */
  addModified(Resource, customOperations) {
    var operations = customOperations ? customOperations.concat(ResourceAugments.operations) : ResourceAugments.operations

    Resource.prototype.$updateModified = function(params, success, error) {
      let result
      if(typeof params === 'function') {
        // multiple uses of resource methods
        // swap the arguments because a function was passed in
        error = success
        success = params
        params = {} // no params because the defaults are just used when a function is passed
      }
      result = this.constructor.update.call(this, params, 
        ResourceAugments.calculatePlainObjectDifference(this.constructor.$$master, this), success, error)
      return result.$promise || result
    }

    operations.forEach((op) => {
      this._trackMaster(Resource, op)
    })

  }

}

ResourceAugments.operations = ['get', 'update', 'save']

/**
 * @ngdoc method
 * @name ResourceAugments#angularObjectToJsonObject
 * @static
 *
 * @description
 * Strips all non-primitive property values from an object and proprietary angular properties,
 * e.g. `$$touched`
 * 
 * @param {Object} obj The object that will be converted to a plain json object
 * @returns {Object} The resulting plain json object
 */
ResourceAugments.angularObjectToJsonObject = function(obj) {
  return angular.fromJson(angular.toJson(obj))
}

/**
 * @ngdoc method
 * @name ResourceAugments#calculatePlainObjectDifference
 * @static
 *
 * @description
 * Calculates the difference between two objects, and returns an object with those differences.
 * The use case for this class is for calculating the differences between a previous and current
 * state of a model.
 * 
 * @param {Object} prev The original state of the object
 * @param {Object} now The current state of the object
 * @return {Object} A new object containing the differences
 * 
 */
ResourceAugments.calculatePlainObjectDifference = function(prev, now) {

  let changes = {}, c
  prev = ResourceAugments.angularObjectToJsonObject(prev)
  now = ResourceAugments.angularObjectToJsonObject(now)

  for (var prop in now) {
    if (!prev || prev[prop] !== now[prop]) {
      if (typeof now[prop] === 'object') { // when converted fromJson as object, it's type is always object
        c = this._getChanges(prev[prop], now[prop])
        if (!Object.keys(c).length) { // this is an empty object
          changes[prop] = c
        }
      } else {
        changes[prop] = now[prop]
      }
    }
  }

  return changes
}

