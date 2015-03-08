/**
  * @ngdoc service
  * @name promiseInterceptor
  * @description 
  * Produces an instance that can be used to interjecting the lifecycle of a
  * promise.
  *
 */

export function promiseInterceptor() {

  /**
   * @ngdoc function
   *
   * @description
   * Wraps a promise, interjecting it's resolution or failure, and firing handlers
   * that can be customized, for example, reporting messages to the use.
   * 
   * @param {Object} config A specifier, with properties that are function callbacks,
   * `start`, `end` and `fail` that will be called in each promises lifecycle when `wrap`
   * is invoked properly.
   */
  return function(config) {

    return {

      start: config.start, // callback functions to be invoked
      end: config.end,
      fail: config.fail,

      /**
       * @ngdoc method
       * @name promiseInterceptor instance#wrap
       *
       * @description
       * Wraps a promise, interjecting it's resolution or failure, and firing handlers
       * that can be customized, for example, reporting messages to the use.
       * 
       * @param {Object} promise the promise to be wrapped and interjected on
       * @param {?} message A value that will be passed into the promiseInterceptor instance's
       *   `start` callback before the promise has resolved
       * @param {?} endMessage A value that will be passed into the instance's `end` callback
       *   after the promise has resolved
       * @param {?} failMessage A value that will be passed into the instance's `fail` callback
       *   if the promise is rejected
       * @returns {Object} promise The original promise
       */
      wrap: function(promise, message, endMessage, failMessage) {

        this.start(message)

        promise.then(() => {
          this.end(endMessage)
        }).catch(() => {
          // report an error message, order determined by 
          this.fail(failMessage || res.message || res.statusText || res.status + ' Error')
        })

        // return the promise before the messages is displayed to allow prior chaining
        return promise

      }
    }
  }
}