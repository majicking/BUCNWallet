(function () {
    'use strict';

    angular.module('app').controller('RollInCtrl', RollInCtrl);
    RollInCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', '$state', 'PayService','MstrService'];
    function RollInCtrl($rootScope, $scope, $stateParams, $ionicLoading, $ionicPopup, $state, PayService,MstrService) {
        var vm = this;
        vm.subAccountType = $stateParams.subAccountType;
        vm.model = {
            subAccountTypeList:$rootScope.userInfo.subAccountTypeList,
            userId : $rootScope.userInfo.userId,
            amount : null,
            payType : null,
            subAccountType : vm.subAccountType
        };

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.payTypeList = [];
        vm.disabled = true;

        vm.amountChanged = amountChanged;
        vm.payTypeChanged = payTypeChanged;
        vm.pay = pay;
        getPayList();

        function getPayList() {
            MstrService.getPayList(
            ).success(function (data) {
                vm.payTypeList = data.list;
                vm.model.payType = vm.payTypeList[0].value;
            }).error(function (error) {
            }).finally(function () {
            })
        }

        function amountChanged(){
            var re = /^\d+\.?\d{0,2}$/;
            //if ( vm.amount < 100 ){
            //    $scope.$emit('alertWarning', '充值金额不能小于100');
            //    vm.disabled = true;
            //    return;
            //}
            if(!re.test(vm.model.amount)){
                $scope.$emit('alertWarning', '充值金额只能保留到小数点后两位');
                vm.disabled = true;
                return;
            }else {
                vm.disabled = false;
                return;
            }
        }

        function payTypeChanged(payType){
            vm.model.payType = payType;
        }

        function pay() {
            if (vm.model.amount == null || $.trim(vm.model.amount) == '') {
                $scope.$emit('alertWarning', '请输入转入金额');
                return;
            }
            if (vm.model.payType == null || $.trim(vm.model.payType) == '') {
                $scope.$emit('alertWarning', '请选择支付方式');
                return;
            }
            if (vm.model.payType == 1) {

            } else {
                PayService.alipay(
                    vm.model.amount,
                    vm.model.payType,
                    vm.model.userId,
                    vm.model.subAccountType
                ).success(function (data) {
                }).error(function (error) {
                }).finally(function () {
                    $ionicLoading.hide();
                })
            }
        }

    }
})();