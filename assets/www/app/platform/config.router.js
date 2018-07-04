(function () {
    'use strict';

    /**
     * Config for the router
     */
    angular.module('app')
        .run(
            ['$rootScope', '$state', '$stateParams',
                function ($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        )
        .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
                $ionicConfigProvider.backButton.text("");
                $ionicConfigProvider.backButton.previousTitleText(false);

                $ionicConfigProvider.platform.ios.tabs.style('standard');
                $ionicConfigProvider.platform.ios.tabs.position('bottom');
                $ionicConfigProvider.platform.android.tabs.style('standard');
                $ionicConfigProvider.platform.android.tabs.position('standard');

                $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
                $ionicConfigProvider.platform.android.navBar.alignTitle('center');

                $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
                $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

                $ionicConfigProvider.platform.ios.views.transition('ios');
                $ionicConfigProvider.platform.android.views.transition('android');

                $urlRouterProvider.otherwise('/login');
                var ver = "1.1";
                $stateProvider
                    .state('tab', {
                        cache: 'false',
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'app/platform/modules/tabs.html'
                    })
                    .state('tab.account', {
                        cache: 'false',
                        url: '/account?code',
                        nativeTransitions: null,
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/account.html?ver=' + ver,
                                controller: 'AccountCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/account.ctrl.js?ver=' + ver);
                                    }],

                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver,
                                                'app/platform/services/coin.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    
                    .state('tab.account-traderecord', {
                        cache: 'false',
                        url: '/account/traderecord?id',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/trade.record.html?ver=' + ver,
                                controller: 'TradeRecordCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/trade.record.ctrl.js');
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    
                    .state('tab.account-building', {
                        url: '/account/building',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/building.html?ver=' + ver
                            }
                        }
                    })
                    .state('tab.account-qrcode', {
                        cache: 'false',
                        url: '/account/qrcode',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/qrcode.html?ver=' + ver,
                                controller: 'QrcodeCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/qrcode.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-scanqrcode', {
                        cache: 'false',
                        url: '/account/scan/qrcode',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/scan.qrcode.html?ver=' + ver,
                                controller: 'ScanQrcodeCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/scan.qrcode.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/coin.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-gopay', {
                        cache: 'false',
                        url: '/account/go/pay?address',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/go.pay.html?ver=' + ver,
                                controller: 'GoPayCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/go.pay.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver,
                                                'app/platform/services/coin.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-withdraw', {
                        cache: 'false',
                        url: '/account/withdraw?code&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/withdraw.html?ver=' + ver,
                                controller: 'WithdrawCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/withdraw.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-withdraw-result', {
                        cache: 'false',
                        url: '/account/withdraw-result/{id}?code&subAccountType&back',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/withdraw/result.html?ver=' + ver,
                                controller: 'WithdrawResultCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/withdraw/result.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-roll-out', {
                        cache: 'false',
                        url: '/account/roll-out?code&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/roll.out.html?ver=' + ver,
                                controller: 'RollOutCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/roll.out.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-roll-out-result', {
                        cache: 'false',
                        url: '/roll/roll-out-result/{id}?code&subAccountType&back',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/roll/roll.out.result.html?ver=' + ver,
                                controller: 'RollOutResultCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/roll/roll.out.result.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-send-from-result', {
                        cache: 'false',
                        url: '/send/result/{id}?code',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/send/result.html?ver=' + ver,
                                controller: 'ResultCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/send/result.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/coin.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-bill-list', {
                        cache: 'false',
                        url: '/account/bill-list?code&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/bill.list.html?ver=' + ver,
                                controller: 'BillListCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/bill.list.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-payment-list', {
                        cache: 'false',
                        url: '/account/payment-list?code&subAccountType&seqType&back',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/payment.seq.list.html?ver=' + ver,
                                controller: 'PaymentSeqListCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/payment.seq.list.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver,
                                                'app/platform/services/mstr.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-roll-in', {
                        cache: 'false',
                        url: '/account/roll-in?subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/roll.in.html?ver=' + ver,
                                controller: 'RollInCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/roll.in.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/pay.service.js?ver=' + ver,
                                                'app/platform/services/mstr.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-pay-order', {
                        cache: 'false',
                        url: '/account/pay/order?order_no&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/pay.order.html?ver=' + ver,
                                controller: 'PayOrderCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/pay.order.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/services/account.service.js?ver=' + ver,'app/platform/services/pay.service.js?ver='+ ver]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-pay-result', {
                        cache: 'false',
                        url: '/account/pay/result?code&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/pay.result.html?ver=' + ver,
                                controller: 'PayResultCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/pay.result.ctrl.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.notice-list', {
                        cache:'false',
                        url: '/notice-list?code',
                        nativeTransitions: null,
                        views: {
                            'tab-notice': {
                                templateUrl: 'app/platform/modules/notice/list.html?ver=' + ver,
                                controller: 'NoticeListCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load('app/platform/modules/notice/list.ctrl.js?ver=' + ver);
                                    }],
                                    loadService:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/notice.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.notice-list-notice', {
                        cache:'false',
                        url: '/notice-list/notice?code&id',
                        views: {
                            'tab-notice': {
                                templateUrl: 'app/platform/modules/notice/detail.html?ver=' + ver,
                                controller: 'NoticeCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load('app/platform/modules/notice/detail.ctrl.js?ver=' + ver);
                                    }],
                                    loadService:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/notice.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage', {
                        cache: 'false',
                        url: '/manage?code',
                        nativeTransitions: null,
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/manage.html?ver=' + ver,
                                controller: 'ManageCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/manage.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver,
                                                'app/platform/services/upload.service.js?ver=' + ver,
                                                'app/platform/services/mstr.service.js?ver=' + ver,
                                                'app/platform/services/user.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.setting', {
                        cache: 'false',
                        url: '/manage/setting',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/setting.html',
                                controller: 'SettingCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/setting.ctrl.js');
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                        [
                                            'app/platform/services/account.service.js?ver=' + ver,
                                            'app/platform/services/upload.service.js?ver=' + ver,
                                            'app/platform/services/mstr.service.js?ver=' + ver
                                        ]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-mobile', {
                        url: '/manage/mobile?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/mobile.html?ver=' + ver,
                                controller: 'MobileCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load('app/platform/modules/account/mobile.ctrl.js?ver=' + ver);
                                    }],
                                    loadService:['$ocLazyLoad',function($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-order', {
                        cache: 'false',
                        url: '/manage/order?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/order.html?ver=' + ver,
                                controller: 'OrderCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/order.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-pay', {
                        cache: 'false',
                        url: '/manage/pay?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/pay.html?ver=' + ver,
                                controller: 'PayCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/pay.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-pay-result', {
                        cache: 'false',
                        url: '/manage/pay/result?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/pay/result.html?ver=' + ver
                            }
                        }
                    })
                    .state('tab.manage-referral', {
                        cache: 'false',
                        url: '/manage/referral?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/referral.html?ver=' + ver,
                                controller: 'ReferralCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/referral.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-agent', {
                        cache: 'false',
                        url: '/manage/agent',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/agent.html?ver=' + ver,
                                controller: 'AgentCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/agent.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-bankcard-list', {
                        cache: 'false',
                        url: '/manage/bankcard/list?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/bankcard.list.html?ver=' + ver,
                                controller: 'BankCardListCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/bankcard.list.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/bankcard.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-bankcard-add', {
                        cache: 'false',
                        url: '/manage/bankcard/add?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/bankcard.add.html?ver=' + ver,
                                controller: 'BankCardAddCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/modules/account/bankcard.add.ctrl.js?ver=' + ver]);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/services/bankcard.service.js?ver=' + ver, 'app/platform/services/account.service.js?ver=' + ver]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-bankcard', {
                        cache: 'false',
                        url: '/manage/bankcard?code&id',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/bankcard.html?ver=' + ver,
                                controller: 'BankCardCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/modules/account/bankcard.ctrl.js?ver=' + ver]);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/services/bankcard.service.js?ver=' + ver, 'app/platform/services/account.service.js?ver=' + ver]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-user-graph', {
                        cache:'false',
                        url: '/manage/user-graph',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/user.graph.html?ver=' + ver,
                                controller: 'UserGraphCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load('app/platform/modules/account/user.graph.ctrl.js?ver=' + ver);
                                    }],
                                    loadService:['$ocLazyLoad',function($ocLazyLoad){
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-password', {
                        cache: 'false',
                        url: '/manage/password?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/password.html?ver=' + ver,
                                controller: 'PasswordCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/password.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-repayment', {
                        cache: 'false',
                        url: '/manage/repayment?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/repayment.html?ver=' + ver,
                                controller: 'RePaymentCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/repayment.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('agreement', {
                        cache: 'false',
                        url: '/agreement',
                        templateUrl: 'app/platform/modules/account/agreement.html',
                        controller: 'AgreementCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/agreement.ctrl.js');
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/agreement.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('qiye-login', {
                        cache: 'false',
                        url: '/qiye-login?code',
                        templateUrl: 'app/platform/modules/account/qiye.login.html?ver=' + ver,
                        controller: 'QiYeLoginCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/qiye.login.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('qiye-forgot', {
                        cache: 'false',
                        url: '/qiye-forgot?code',
                        templateUrl: 'app/platform/modules/account/qiye.forgot.html?ver=' + ver,
                        controller: 'QiYeForgotCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/qiye.forgot.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('login', {
                        cache: 'false',
                        url: '/login?code&type',
                        templateUrl: 'app/platform/modules/account/login.html?ver=' + ver,
                        controller: 'LoginCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/login.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                    'app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('forgot', {
                        cache: 'false',
                        url: '/forgot?code',
                        templateUrl: 'app/platform/modules/account/forgot.html?ver=' + ver,
                        controller: 'ForgotCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/forgot.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('register', {
                        cache: 'false',
                        url: '/register?code&referralCode',
                        templateUrl: 'app/platform/modules/account/register.html?ver=' + ver,
                        controller: 'RegisterCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/register.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                    [
                                        'app/platform/services/user.service.js?ver=' + ver,
                                        'app/platform/services/coin.service.js?ver=' + ver
                                    ]
                                );
                            }]
                        }
                    })
                    .state('tab.manage-verify', {
                        cache: 'false',
                        url: '/manage/verify?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/verify.html?ver=' + ver,
                                controller: 'VerifyCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/verify.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('qiye-verify', {
                        cache: 'false',
                        url: '/verify?code',
                        templateUrl: 'app/platform/modules/account/qiye.verify.html?ver=' + ver,
                        controller: 'QiYeVerifyCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/qiye.verify.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('payment', {
                        cache: 'false',
                        url: '/payment?code',
                        templateUrl: 'app/platform/modules/account/payment.html?ver=' + ver,
                        controller: 'PaymentCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/payment.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('binding', {
                        cache: 'false',
                        url: '/binding?code',
                        templateUrl: 'app/platform/modules/account/binding.html?ver=' + ver,
                        controller: 'BindingCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/binding.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('wechat', {
                        cache: 'false',
                        url: '/wechat?qrcode&code&state',
                        templateUrl: 'app/platform/modules/account/wechat.html?ver=' + ver,
                        controller: 'WechatCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/account/wechat.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
                    .state('tab.account-payment-account-0001', {
                        cache: 'false',
                        url: '/account/payment-account1?subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/payment.account1.html?ver=' + ver,
                                controller: 'PaymentAccountCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/payment.account.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load( 'app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-payment-account-0002', {
                        cache: 'false',
                        url: '/account/payment-account2?subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/payment.account2.html?ver=' + ver,
                                controller: 'PaymentAccountCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/payment.account.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load( 'app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-payment-account-0003', {
                        cache: 'false',
                        url: '/account/payment-account3?subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/payment.account3.html?ver=' + ver,
                                controller: 'PaymentAccountCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/payment.account.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load( 'app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-photo', {
                        cache: 'false',
                        url: '/manage/photo?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/photo.html?ver=' + ver,
                                controller: 'PhotoCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/photo.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(
                                            [
                                                'app/platform/services/account.service.js?ver=' + ver,
                                                'app/platform/services/upload.service.js?ver=' + ver
                                            ]
                                        );
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-transfer', {
                        cache: 'false',
                        url: '/account/transfer?code&subAccountType',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/transfer.html?ver=' + ver,
                                controller: 'TransferCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/transfer.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-ent-bank', {
                        cache: 'false',
                        url: '/manage/ent/bank?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/account/ent.bank.html?ver=' + ver,
                                controller: 'EntBankCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/modules/account/ent.bank.ctrl.js?ver=' + ver]);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/services/mstr.service.js?ver=' + ver, 'app/platform/services/ent.service.js?ver=' + ver]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-ceded-list', {
                        cache: 'false',
                        url: '/account/ceded-list?code&subAccountType&id',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/ceded.list.html?ver=' + ver,
                                controller: 'CededListCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/ceded.list.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-ceded', {
                        cache: 'false',
                        url: '/account/ceded?code&subAccountType&id',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/account/ceded.html?ver=' + ver,
                                controller: 'CededCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/account/ceded.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load(['app/platform/services/account.service.js?ver=' + ver, 'app/platform/services/user.service.js?ver=' + ver]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.account-ceded-result', {
                        cache: 'false',
                        url: '/account/ceded-result/{id}?code&subAccountType&back',
                        views: {
                            'tab-account': {
                                templateUrl: 'app/platform/modules/ceded/result.html?ver=' + ver,
                                controller: 'CededResultCtrl',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/ceded/result.ctrl.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/services/account.service.js?ver=' + ver);
                                    }]
                                }
                            }
                        }
                    })
                    .state('tab.manage-pattern', {
                        cache: 'false',
                        url: '/pattern/pattern.setting?code',
                        views: {
                            'tab-manage': {
                                templateUrl: 'app/platform/modules/pattern/pattern.setting.html?ver=' + ver,
                                controller: 'PatternSetting',
                                controllerAs: 'vm',
                                resolve: {
                                    loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('app/platform/modules/pattern/pattern.setting.js?ver=' + ver);
                                    }],
                                    loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                            'app/platform/services/pattern.service.js?ver=' + ver
                                        ]);
                                    }]
                                }
                            }
                        }
                    })
                    .state('password-gesture', {
                        cache: 'false',
                        url: '/password/gesture?code',
                        templateUrl: 'app/platform/modules/pattern/passwordGesture.html?ver=' + ver,
                        controller: 'PatternPassWordGestureCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/modules/pattern/passwordGesture.ctrl.js?ver=' + ver);
                            }],
                            loadService: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/platform/services/user.service.js?ver=' + ver);
                            }]
                        }
                    })
            }]
        )
})();