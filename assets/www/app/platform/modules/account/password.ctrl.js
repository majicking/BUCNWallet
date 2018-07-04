/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('PasswordCtrl', PasswordCtrl);
    PasswordCtrl.$inject = ['$rootScope', '$scope', '$interval', '$ionicLoading', '$ionicNativeTransitions', 'UserService', '$translate'];
    function PasswordCtrl($rootScope, $scope, $interval, $ionicLoading, $ionicNativeTransitions, UserService, $translate) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.oldPassword = '';
        vm.newPassword = '';
        vm.rePassword = '';

        vm.changePassword = changePassword;

        function changePassword() {
            if (vm.oldPassword == null || $.trim(vm.oldPassword) == '') {
                $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_old_password'));
                return;
            }
            if (vm.newPassword == null || $.trim(vm.newPassword) == '') {
                $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_new_password'));
                return;
            }
            var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!re.test(vm.newPassword)) {
                $scope.$emit('alertWarning', $translate.instant('verify.the_new_password_format_is_incorrect'));
                return;
            }
            if (vm.rePassword == null || $.trim(vm.rePassword) == '') {
                $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_password_again'));
                return;
            }
            if (vm.newPassword != vm.rePassword) {
                $scope.$emit('alertWarning', $translate.instant('verify.the_password_for'));
                return;
            }
            $ionicLoading.show();
            UserService.changePassword(
                vm.userId,
                vm.oldPassword,
                vm.newPassword
            ).success(function (data) {
                $scope.$emit('alertWarning', $translate.instant('verify.password_modification_succeeded'));
                $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                    "type": "slide",
                    "direction": "right"
                });
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            })
        }
    }
})();