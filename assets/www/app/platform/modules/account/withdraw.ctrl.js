(function () {
    'use strict';

    angular.module('app').controller('WithdrawCtrl', WithdrawCtrl);
    WithdrawCtrl.$inject = ['$rootScope', '$sessionStorage', '$scope', '$ionicLoading', '$ionicNativeTransitions', 'AccountService', '$stateParams'];
    function WithdrawCtrl($rootScope, $sessionStorage, $scope, $ionicLoading, $ionicNativeTransitions, AccountService, $stateParams) {
        var vm = this;
        vm.subAccountType = $stateParams.subAccountType;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {
            userType:$rootScope.userInfo.userType
        };

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.input = {
            withdrawSessionToken : void 0
        };

        vm.disabled = true;

        vm.moneyChanged = moneyChanged;
        vm.confirm = confirm;
        vm.allIn = allIn;

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        getWithdrawInfo();

        function getWithdrawInfo(){
            $ionicLoading.show();
            AccountService.getWithdrawInfo(
                vm.userId,
                vm.subAccountType
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.userType = $sessionStorage.userInfo.userType = vm.model.userType;
                angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                    if (item.value == vm.subAccountType) {
                        item.text = vm.model.subAccountTypeText;
                        return;
                    }
                });
                vm.input.withdrawSessionToken = data.withdrawSessionToken;
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            })
        }

        function moneyChanged(){
            var re = /^\d+\.?\d{0,2}$/;
            if(!re.test(vm.input.money)){
                vm.disabled = true;
            }else {
                if (vm.input.money > 0) {
                    vm.disabled = false;
                } else {
                    vm.disabled = true;
                }
            }
        }

        function allIn(){
            vm.input.money = parseInt(vm.model.cashAmount / 100) * 100;
            moneyChanged();
            if (vm.input.money <= 0) {
                vm.input.money = null;
            }
        }

        function confirm(){
            if(vm.model.cashAmount < vm.input.money){
                $scope.$emit('alertWarning', '交易股本额超限');
            }else if(vm.model.tradeLimit != null
                && vm.input.money < vm.model.tradeLimit){
                $scope.$emit('alertWarning', '交易股本额低于最低额');
            }else if(vm.input.money%100 != 0){
                $scope.$emit('alertWarning', '交易股本额必须是100的整数倍');
            }else if(vm.input.payPassword == null
                || $.trim(vm.input.payPassword) == ''){
                $scope.$emit('alertWarning', '请输入交易密码');
            }else{
                $ionicLoading.show();
                vm.input.checkCode = vm.model.checkCode;
                vm.input.userId = vm.userId;
                vm.input.bankCardId = vm.model.bankCard.id;
                vm.input.subAccountType = vm.subAccountType;
                AccountService.withdraw(
                    vm.input
                ).success(function (data) {
                    $ionicNativeTransitions.stateGo('tab.account-withdraw-result', {
                        id:data,
                        subAccountType:vm.subAccountType,
                        back:'account'
                    }, {}, {
                        "type": "slide",
                        "direction": "right"
                    });
                }).error(function (error) {
                }).finally(function () {
                    $ionicLoading.hide();
                })
            }
        }
    }

    function sub(num1,num2){
        var r1,r2, m,n;
        try{
            r1 = num1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2=num2.toString().split(".")[1].length;
        }catch(e){
            r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        n=(r1>=r2)?r1:r2;
        return (Math.round(num1*m-num2*m)/m).toFixed(n);
    }
})();