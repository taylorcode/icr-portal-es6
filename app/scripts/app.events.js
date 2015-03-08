export function applicationEventsRun($rootScope, $state, AUTH_EVENTS, modalLogin, AuthService, userSession, $document, $window, $location, $http) {

  // store session and storage for access from all templates
  $rootScope.storage = {}
  $rootScope.session = {}

  // synchronize the session from server --> localStorage --> $rootScope.template
  AuthService.load($rootScope.session)

  // when a new session is loaded, swap the user on the template
  $rootScope.$on('AuthService:load', function(event, user) {
    $rootScope.storage.user = user
  })

  // when logging in, if we have an existing user then just swap the user
  // this occurs from auto synchronization of the session. Otherwise
  // we can assume that they're logging in as a new user and just let them continue
  // on their way
  $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, user) {
    if (user) {
      $rootScope.storage.user = user
    } else {
      $state.go($state.next, $state.toParams)
    }
  })

  // listen for the user to change, and reload the current state
  $rootScope.$on(AUTH_EVENTS.userChanged, function() {
    $state.go($state.current, null, {
      reload: true,
      notify: true
    })
  })

  // define logged out events
  loggedOutEvents = [AUTH_EVENTS.notAuthorized, AUTH_EVENTS.notAuthenticated, AUTH_EVENTS.sessionTimeout]

  // NOTE - should we really show the login modal, or ex. 
  // you're logged as so and so, but you don't have permission to view for not authorized or authenticated?
  // listen for session compromised events, respond by showing modal
  loggedOutEvents.forEach((authEvent) => {
    $rootScope.$on(authEvent, function() {
      modalLogin.activate()
    })
  })

  // listen for logged out event, respond by redirecting to login view
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, () => {
    $state.go('login')
  })
  // relay events out of the app with the app's prefix
  $rootScope.$on('btfModal', function(event, data) {
    $document.ready(function() {
      $window.dispatchEvent(new CustomEvent('portal:btfModal', {
        detail: data
      }))
    })
  })

}