/**
  * @ngdoc service
  * @name portalApis
  * @description 
  * Map of all api resources for the application.
  *
 */

export function portalApis($resource, $upload, resourceAugments) {

  let apis = {
    user: $resource('/api/user/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }),
    password: $resource('/api/user/password', null, {
      update: {
        method: 'PUT'
      }
    }),
    picture: $resource('/api/user/picture'),
    uploadProfilePicture: function (file) {
      return $upload.upload({
        url: 'v2/api/user/picture',
        file: file,
        fileFormData: 'profilePicture'
      })
    },
    billing: $resource('/api/user/billing', null, {
      update: {
        method: 'PUT'
      }
    }),
    planBilling: $resource('/api/user/plans/:planId/billing', null, {
      update: {
        method: 'PUT'
      }
    }),
    bills: $resource('/api/user/bills'),
    planBills: $resource('/api/user/plans/:planId/bills', null, {
      update: {
        method: 'PUT'
      }
    }),
    notifications: $resource('/api/user/notifications'),
    devices: $resource('/api/user/devices'),
    plans: $resource('/api/user/plans/:id', {
      id: '@id'
    }),
    perks: $resource('/api/user/perks'),
    card: $resource('/api/user/card'),
    activity: $resource('/api/user/activity'),
    feedback: $resource('/api/feedback')
  }

  // adds $updateModified method to all resource instances
  resourceAugments.addModified(apis.user)

  return apis

}