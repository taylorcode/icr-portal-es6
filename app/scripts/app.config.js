export function applicationConfig($httpProvider, $stateProvider, USER_ROLES, $breadcrumbProvider, stripeProvider, icrPortalRouterResolvesProvider) {

  // configure stripe with our production key
  stripeProvider.setPublishableKey('pk_live_jrWsgyOqI1zirmIFqR8Pb3fp')

  // intercept http requests for authorization
  $httpProvider.interceptors.push('icrApiRequestInterceptor');

  // set up breadcrumbs template for views
  $breadcrumbProvider.setOptions({
    templateUrl: 'breadcrumbs'
  })

  $stateProvider
  .state('frame', {
    abstract: true,
    url: '/portal',
    templateUrl: 'frame',
    controller: 'FrameController as frame',
    resolve: icrPortalRouterResolvesProvider['frame']
  })

  .state('components', {
    url: '/components',
    parent: 'frame',
    templateUrl: 'components',
    controller: 'ComponentsController as components'
  })

  .state('login', {
    url: '/login',
    parent: 'frame',
    controller: 'LoginController as login',
    templateUrl: 'login',
    title: 'Login'
  })

  .state('navigation', {
    parent: 'frame',
    abstract: true,
    controller: 'NavigationController as navigation',
    templateUrl: 'navigation',
    data: {
      authorizedRoles: [USER_ROLES.user]
    }
  })

  .state('membership', {
    url: '/membership',
    parent: 'navigation',
    controller: 'MembershipController as membership',
    templateUrl: 'membership',
    title: 'Membership',
    autoRedirect: 'plans.current',
    ncyBreadcrumb: {
      label: 'Membership'
    }
  })

  .state('plans', {
    abstract: true,
    parent: 'membership',
    controller: 'PlansController as plans',
    templateUrl: 'plans',
    resolve: icrPortalRouterResolvesProvider['plans']
  })

  .state('plans.current', {
    controller: 'PlansItemsController as plansItems',
    url: '/current',
    templateUrl: 'plans.items',
    title: 'Current',
    resolve: icrPortalRouterResolvesProvider['plans.current']
  })

  .state('plans.past', {
    controller: 'PlansItemsController as plansItems',
    url: '/past',
    templateUrl: 'plans.items',
    title: 'Past Plans',
    resolve: icrPortalRouterResolvesProvider['plans.past']
  })

  .state('plan', {
    url: '/:policyId',
    parent: 'membership',
    controller: 'PlanController as plan',
    templateUrl: 'plan',
    autoRedirect: 'plan.basic.details',
    title: 'Plan',
    ncyBreadcrumb: {
      label: '{{data.plan.devices[0].title}}'
    },
    resolve: icrPortalRouterResolvesProvider['plan']
  })

  .state('plan.basic', {
    abstract: true,
    templateUrl: 'plan.basic'
  })

  .state('plan.basic.details', {
    url: '/details',
    controller: 'PlanDetailsController as planDetails',
    templateUrl: 'plan.details',
    title: 'Details'
  })

  .state('plan.basic.details.issues', {
    url: '/issues',
    controller: 'PlanIssuesController as planIssues'
  })

  .state('plan.basic.devices', {
    url: '/devices',
    controller: 'PlanDevicesController as planDevices',
    templateUrl: 'plan.devices',
    title: 'Devices'
  })

  .state('perks', {
    url: '/perks',
    parent: 'navigation',
    controller: 'PerksController as perks',
    templateUrl: 'perks',
    title: 'Perks',
    resolve: icrPortalRouterResolvesProvider['perks']
  })

  .state('account', {
    url: '/account',
    parent: 'navigation',
    controller: 'AccountController as account',
    templateUrl: 'account',
    autoRedirect: 'account.profile',
    title: 'Account'
  })

  .state('account.profile', {
    url: '/profile',
    controller: 'ProfileController as profile',
    templateUrl: 'profile',
    title: 'Profile',
    resolve: icrPortalRouterResolvesProvider['account.profile']
  })

  .state('account.password', {
    url: '/password',
    controller: 'PasswordController as password',
    templateUrl: 'password',
    title: 'Password'
  })

  .state('account.billing', {
    url: '/billing',
    controller: 'BillingController as billing',
    templateUrl: 'billing',
    title: 'Billing',
    ncyBreadcrumb: {
      label: 'Billing'
    },
    resolve: icrPortalRouterResolvesProvider['account.billing']
  })

  .state('account.billing.edit', {
    url: '/edit',
    controller: 'BillingEditController as billingEdit',
    resolve: icrPortalRouterResolvesProvider['account.billing.edit']

  })

  .state('account.billing.plan', {
    url: '/:planId',
    views: {
      '@navigation': {
        controller: 'BillingPlanController as billingPlan',
        templateUrl: 'billing.plan'
      }
    },
    ncyBreadcrumb: {
      label: '{{data.billingPlan.plan.devices[0].title}}'
    },
    resolve: icrPortalRouterResolvesProvider['account.billing.plan']
  })

  .state('help', {
    url: '/help',
    parent: 'navigation',
    controller: 'HelpController as help',
    templateUrl: 'help',
    title: 'Help'
  })

  .state('feedback', {
    url: '/feedback',
    parent: 'navigation',
    controller: 'FeedbackController as feedback',
    templateUrl: 'feedback',
    title: 'Feedback'
  })

  .state('feedbackSuccess', {
    url: '/success',
    parent: 'navigation',
    templateUrl: 'feedback-success'
  })

  .state('404', {
    url: '*path',
    autoRedirect: 'plans.current'
  })

}