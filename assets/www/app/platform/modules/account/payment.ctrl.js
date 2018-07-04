/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('PaymentCtrl', PaymentCtrl);
    PaymentCtrl.$inject = ['$rootScope','$scope', '$sessionStorage', '$ionicLoading', '$state', 'UserService'];
    function PaymentCtrl($rootScope,$scope, $sessionStorage, $ionicLoading, $state, UserService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.paymentPw = '';
        vm.rePassword = '';

        vm.confirm = confirm;

        function confirm() {
            var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (vm.paymentPw == null || $.trim(vm.paymentPw) == '') {
                $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_new_password'));
                return;
            }
            if (!re.test(vm.paymentPw)) {
                $scope.$emit('alertWarning', $translate.instant('verify.the_new_password_format_is_incorrect'));
                return;
            }
            if (vm.rePassword == null || $.trim(vm.rePassword) == '') {
                $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_password_again'));
                return;
            }
            if (vm.paymentPw != vm.rePassword) {
                $scope.$emit('alertWarning', $translate.instant('verify.the_password_for'));
                return;
            }
            $ionicLoading.show();
            UserService.addPaymentPw(
                vm.userId,
                vm.paymentPw
            ).success(function (data) {
                $rootScope.userInfo.isPayment = $sessionStorage.userInfo.isPayment = 1;
                $ionicLoading.hide();
                $state.go('tab.account');
            }).error(function (error) {
                $ionicLoading.hide();
            });
        }
    }
})();