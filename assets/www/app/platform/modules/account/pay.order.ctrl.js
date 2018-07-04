(function () {
    'use strict';

    angular.module('app').controller('PayOrderCtrl', PayOrderCtrl);
    PayOrderCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', '$ionicNativeTransitions', 'AccountService','PayService'];
    function PayOrderCtrl($rootScope, $scope, $stateParams, $ionicLoading, $ionicPopup, $ionicNativeTransitions, AccountService,PayService) {
        var vm = this;
        vm.input = {};

        vm.order_no = $stateParams.order_no;
        vm.subAccountType = $stateParams.subAccountType;

        vm.subAccountTypeList = $rootScope.userInfo.subAccountTypeList;

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.subAccountTypeText = item.text;
                return;
            }
        });
        vm.disabled = true;

        vm.username = $rootScope.userInfo.username;

        vm.confirm = confirm;

        getPayInfo();

        function getPayInfo() {
            $ionicLoading.show();
            PayService.getPayReturn(
                vm.order_no
            ).success(function (data) {
                vm.model = data;
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            })
        }

        function confirm() {
            if (vm.model.status == '00'){
                $scope.$emit('alertWarning', '支付中稍后重试');
            } else if (vm.model.status == '01'){
                $scope.$emit('alertWarning', '支付成功');
                $ionicNativeTransitions.stateGo('tab.account-pay-result', {code:'1',subAccountType:vm.subAccountType}, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }else if (vm.model.status == '02'){
                $scope.$emit('alertWarning', '支付失败');
                $ionicNativeTransitions.stateGo('tab.account-pay-result', {code:'2',subAccountType:vm.subAccountType}, {}, {
                    "type": "slide",
                    "direction": "right"
                });
            }
        }
    }
})();