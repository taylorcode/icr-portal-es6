/**
  * @ngdoc provider
  * @name routerResolves
  * @description 
  * Map object for router resolves, each property maps to the corresponding state name.
  *
 */

export function routerResolves() {

  return {

    'frame': {
      sessionProcess: function($q, AuthService, $rootScope) {
        var deferred = $q.defer()
        return AuthService.loginPromise.catch(() => {
          return deferred.resolve('no user session')
        })
      },
      authenticateRouteProcess: function(sessionProcess, $q, $state, AuthService) {
        var authorizedRoles, state = $state.next
        if (state.data && (authorizedRoles = state.data.authorizedRoles)) {
          if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault()
            return $q.reject('user is not authorized to load this route')
          }
        }
      },
      pictureData: function(authenticateRouteProcess, portalApis, icrStore) {
        return portalApis.picture.get().$promise.then((data) => {
          // set the profile image in the data store
          icrStore.set('profilePicture', data)
          return data
        })
      }
    },

    'plans': {
      plansData: function(portalApis) {
        return portalApis.plans.query().$promise
      }
    },

    'plans.current': {
      plansData: function(plansData, icrPortPlanHelper) {
        return icrPortPlanHelper(plansData).getCurrent()
      }
    }

    'plans.past': {
      plansData: function(plansData, icrPortPlanHelper) {
        return icrPortPlanHelper(plansData).getPast()
      }
    },

    'plan': {
      planData: function(portalApis, $stateParams) {
        return portalApis.plans.get({
          id: $stateParams.policyId
        }).$promise
      }
    },

    'perks': {
      perksData: function(portalApis) {
        return portalApis.perks.query().$promise
      }
    },

    'account.profile': {
      userData: function(portalApis) {
        return portalApis.user.get().$promise
      },
      pictureData: function(portalApis) {
        return portalApis.picture.get().$promise
      }
    },

    'account.billing': {
      billsData: function(portalApis) {
        return portalApis.bills.query().$promise
      },
      billingData: function(portalApis) {
        return portalApis.billing.query().$promise
      }
    },

    'account.billing.edit': {
      cardData: function(portalApis) {
        // NOTE nothing now, will pull lastFour
        return {};
      }
    },

    'account.billing.plan': {
      billsData: function(portalApis, $stateParams) {
        return portalApis.planBills.query({
          planId: $stateParams.planId
        }).$promise
      },
      billingPlanData: function(portalApis, $stateParams) {
        return portalApis.planBilling.get({
          planId: $stateParams.planId
        }).$promise
      }
    },

    $get: angular.noop

  }
}
