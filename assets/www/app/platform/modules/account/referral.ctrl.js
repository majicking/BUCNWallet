/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('ReferralCtrl', ReferralCtrl);

    ReferralCtrl.$inject = ['$rootScope', '$scope', '$ionicLoading', '$ionicNativeTransitions','$ionicPopup', '$sessionStorage', 'UserService'];
    function ReferralCtrl($rootScope, $scope, $ionicLoading, $ionicNativeTransitions, $ionicPopup, $sessionStorage, UserService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.referralCode = '';

        vm.addReferralCode = addReferralCode;

        function addReferralCode() {
            if (vm.referralCode == null || $.trim(vm.referralCode) == '') {
                $scope.$emit('alertWarning', '请输入推荐码');
                return;
            }else{
                UserService.validateReferralCode(
                    vm.referralCode,
                    vm.userId
                ).success(function (message) {
                    if(message.code==1){
                        var confirmPopup = $ionicPopup.confirm({
                            title: '确认',
                            template: '<div class="text-center">您的推荐人是'+message.data+'?</div>',
                            cancelText: '否',
                            okText: '是'
                        });
                        confirmPopup.then(function(res) {
                            if(res) {
                                $ionicLoading.show();
                                UserService.addReferralCode(
                                    vm.userId,
                                    vm.referralCode
                                ).success(function (data) {
                                    $rootScope.userInfo.referralName = $sessionStorage.userInfo.referralName = data;
                                    $scope.$emit('alertWarning', '添加推荐人成功,明日生效');
                                    $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                                        "type": "slide",
                                        "direction": "right"
                                    });
                                }).error(function (error) {
                                }).finally(function () {
                                    $ionicLoading.hide();
                                })
                            }
                        });
                    }else{
                        $scope.$emit('alertWarning', message.message);
                    }
                }).error(function (error) {
                }).finally (function(){
                    $ionicLoading.hide();
                });

            }
        }
    }
})();