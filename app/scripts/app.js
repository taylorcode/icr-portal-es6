// controllers
import {Account} from 'controllers/account'
import {Activity} from 'controllers/activity'
import {BillingEdit} from 'controllers/billing-edit'
import {BillingSummary} from 'controllers/billing-summary'
import {Billing} from 'controllers/billing'
import {BillingPlan} from 'controllers/billing-plan'
import {Components} from 'controllers/components'
import {Dashboard} from 'controllers/dashboard'
import {Devices} from 'controllers/devices'
import {Feedback} from 'controllers/feedback'
import {Frame} from 'controllers/frame'
import {Help} from 'controllers/help'
import {Login} from 'controllers/login'
import {Membership} from 'controllers/membership'
import {Navigation} from 'controllers/navigation'
import {Notifications} from 'controllers/notifications'
import {Password} from 'controllers/password'
import {Perks} from 'controllers/perks'
import {PlanIssues} from 'controllers/plan-issues'
import {PlanClaims} from 'controllers/plan.claims'
import {PlanContract} from 'controllers/plan.contract'
import {PlanDetails} from 'controllers/plan.details'
import {PlanDevices} from 'controllers/plan.devices'
import {Plan} from 'controllers/plan'
import {PlanTerms} from 'controllers/plan.terms'
import {PlanItems} from 'controllers/plan.items'
import {Plans} from 'controllers/plans'
import {Profile} from 'controllers/profile'

// services
import {ApiRequestInterceptor} from 'services/api-request-interceptor'
import {portalApis} from 'services/apis'
import {gamealchemist} from 'services/gamealchemist'
import {IcrStore} from 'services/icr-store'
import {imageCanvasShrinker} from 'services/image-canvas-shrinker'
import {btfModalDecorator} from 'services/modal-decorator'
import {modalBilling, ModalBilling} from 'services/modal-billing'
import {modalConfirm, ModalConfirm} from 'services/modal-confirm'
import {modalIssues, ModalIssues} from 'services/modal-issues'
import {modalLogin, ModalLogin} from 'services/modal-login'
import {modalMessage, ModalMessage} from 'services/modal-message'
import {PlanHelper} from 'services/plan-helper'
import {promiseInterceptor} from 'services/promise-interceptor'
import {ResourceAugments} from 'services/resource-augments'
import {routerResolves} from 'services/router-resolves'
import {UiMessengerDelegate} from 'services/ui-messenger'

// directives
import {hrefFix} from 'directives/href-fix'
import {billingDialog, BillingDialog} from 'directives/billing-dialog'
import {billingHistory} from 'directives/billing-history'
import {billingPlanSummary} from 'directives/billing-plan-summary'
import {icrMainLoader} from 'directives/loader'
import {uiMessenger} from 'directives/ui-messenger'
import {validateMessage} from 'directives/validate-message'
/**
 * @ngdoc overview
 * @name icrPortalApp
 * @description
 * icrPortalApp module definition. Registers all services
 *
 */
angular.module('icrPortalApp', [
  'icrPortalApp:templates',
  'icrMainApp',
  'ngMessages',
  'btford.modal',
  'ngtimeago',
  'angularFileUpload',
  'imageCanvasShinker',
  'icrAuth',
  'ncy-angular-breadcrumb',
  'ngInputModified',
  'angular-stripe',
  'angularPayments'
])

.config(applicationConfig)
.run(applicationEventsRun)

// controllers
.controller('AccountController', Account)
.controller('ActivityController', Activity)
.controller('BillingEditController', BillingEdit)
.controller('BillingSummaryController', BillingSummary)
.controller('BillingController', Billing)
.controller('BillingPlanController', BillingPlan)
.controller('ComponentsController', Components)
.controller('DashboardController', Dashboard)
.controller('DevicesController', Devices)
.controller('FeedbackController', Feedback)
.controller('FrameController', Frame)
.controller('HelpController', Help)
.controller('LoginController', Login)
.controller('MembershipController', Membership)
.controller('NavigationController', Navigation)
.controller('NotificationsController', Notifications)
.controller('PasswordController', Password)
.controller('PerksController', Perks)
.controller('PlanIssuesController', PlanIssues)
.controller('PlanClaimsController', PlanClaims)
.controller('PlanContractController', PlanContract)
.controller('PlanDetailsController', PlanDetails)
.controller('PlanDevicesController', PlanDevices)
.controller('PlanController', Plan)
.controller('PlanTermsController', PlanTerms)
.controller('PlanItemsController', PlanItems)
.controller('PlansController', Plans)
.controller('ProfileController', Profile)
.controller('ModalBilling', ModalBilling)
.controller('ModalConfirm', ModalConfirm)
.controller('ModalIssues', ModalIssues)
.controller('ModalLogin', ModalLogin)
.controller('ModalMessage', ModalMessage)
.controller('BillingDialog', BillingDialog)

// services
.service('icrApiRequestInterceptor', ApiRequestInterceptor)
.service('portalApis', portalApis)
.service('gamealchemist', gamealchemist)
.service('icrStore', IcrStore)
.service('imageCanvasShrinker', imageCanvasShrinker)
.service('btfModalDecorator', btfModalDecorator)
.service('modalBilling', modalBilling)
.service('modalConfirm', modalConfirm)
.service('modalIssues', modalIssues)
.service('modalLogin', modalLogin)
.service('modalMessage', modalMessage)
.service('icrPortPlanHelper', PlanHelper)
.service('promiseInterceptor', promiseInterceptor)
.service('ResourceAugments', ResourceAugments)
.provider('icrPortalRouterResolves', RouterResolves)
.service('icrUiMessengerDelegate', UiMessengerDelegate)

// directives
.directive('a', hrefFix)
.directive('icrMainBillingDialog', billingDialog)
.directive('billingHistory', billingDialog)
.directive('billingPlanSummary', billingPlanSummary)
.directive('icrMainLoader', icrMainLoader)
.directive('icrUiMessengerDelegate', uiMessenger)
.directive('icrValidateMessage', validateMessage)
