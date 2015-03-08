/**
  * @ngdoc factory
  * @name UiMessengerDelegate
  * @description 
  * Creates a promiseInterceptor, whose promise lifecycle callbacks invoke an array of
  * functions.
  *
 */

export function UiMessengerDelegate(promiseInterceptor) {

  // create a new promiseInterceptor, that executes an array of callbacks
  // at each step in the promises lifecycle
  let interceptor = promiseInterceptor({
    start: function () {
      args = arguments
      this.onStarts.forEach((startFunc) => {
        startFunc.apply(this, args)
      })
    },
    end: function () {
      args = arguments
      this.onEnds.forEach((endFunc) => {
        endFunc.apply(this, args)
      })
    },
    fail: function () {
      args = arguments
      this.onFails.forEach((failFunc) => {
        failFunc.apply(this, args)
      })
    }
  })
  // create containers for the callbacks
  interceptor.onStarts = []
  interceptor.onEnds = []
  interceptor.onFails = []

  return interceptor

}