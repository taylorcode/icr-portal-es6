/**
  * @ngdoc directive
  * @name uiMessenger
  * @description 
  * Used for reporting the progress of an async task to the user. `UiMessengerDelegate` wraps a promise, ex:
  *
  * this.icrUiMessengerDelegate.wrap(this.AuthService.login(credentials), 'logging in...', 'login success!', 'login failed!')
  *  .then(this.loginSuccess)
  *  .catch(this.loginFailure)
  *  .finally(() => {
  *    this.$scope.loginForm.$setPristine()
  *  })
  *
  * First, the `cssClasses.loading` class is added to the element, and the 'logging in...' text goes in the directive
  * element, once the promise resolved the element receives the `cssClasses.loaded` class and 'login success!' text
  * if the promise is rejected, the `cssClasses.loadFail` class is added and the 'login failed!' text.
 */

export function uiMessenger() {
  return {
    scope: {},
    link: UiMessengerLink
  }
}

function UiMessengerLink(scope, elem, attrs) {

  var loadedDelayTime = attrs.icrVLoadedDelay || 1000,
      cssClasses = {
        loading: 'icr-loading',
        loaded: 'icr-loaded',
        loadFail: 'icr-load-fail'
      },
      loading, loaded

  // upon loading, add the loading class and show the loading message
  loading = function(message) {
    elem.html(message)
    elem.addClass(cssClasses.loading)
  }

  // when loaded, it can either be the result of success/failure or other reasons
  // so produce a function that adds a configured class, and when invoked displays
  // a message
  loaded = function(className) {
    return function(message) {
      elem.html(message)
      elem.removeClass(cssClasses.loading).addClass(className)
      return setTimeout(function() {
        return elem.removeClass(className)
      }, loadedDelayTime)
    }
  }

  // generate failure and success callbacks using loaded callback factory
  loadFail = loaded(cssClasses.loaded)
  loadSuccess = loaded(cssClasses.loadFail)

  // add all callbacks/responses to the delegate's arrays
  icrUiMessengerDelegate.onStarts.push(loading)
  icrUiMessengerDelegate.onEnds.push(loadFail)
  icrUiMessengerDelegate.onFails.push(loadSuccess)

  // when the scope is destroyed, remove the responses to prevent ghosts
  scope.$on('$destroy', function() {
    icrUiMessengerDelegate.onStarts.splice(icrUiMessengerDelegate.onStarts.indexOf(loading), 1)
    icrUiMessengerDelegate.onEnds.splice(icrUiMessengerDelegate.onEnds.indexOf(loadFail), 1)
    icrUiMessengerDelegate.onFails.splice(icrUiMessengerDelegate.onFails.indexOf(loadSuccess), 1)
  });

}