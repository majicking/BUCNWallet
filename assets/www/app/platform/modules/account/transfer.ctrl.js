(function () {
    'use strict';

    angular.module('app').controller('TransferCtrl', TransferCtrl);
    TransferCtrl.$inject = ['$rootScope', '$scope', '$ionicLoading', '$ionicNativeTransitions', 'AccountService', '$stateParams'];
    function TransferCtrl($rootScope, $scope, $ionicLoading, $ionicNativeTransitions, AccountService, $stateParams) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;
        vm.subAccountType = $stateParams.subAccountType;

        vm.model = {
            subAccountTypeList:$rootScope.userInfo.subAccountTypeList
        };

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.input = {
            transferSessionToken : void 0
        };

        vm.disabled = true;

        vm.moneyChanged = moneyChanged;
        vm.subAccountChanged = subAccountChanged;
        vm.confirm = confirm;
        vm.allIn = allIn;

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        getTransferInfo();

        function getTransferInfo(){
            $ionicLoading.show();
            AccountService.getTransferInfo(
                vm.userId,
                vm.subAccountType
            ).success(function (data) {
                vm.model = data;
                vm.model.subAccountTypeList = data.subAccountTypeList.list;
                angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                    if (item.value == vm.subAccountType) {
                        item.text = vm.model.subAccountTypeText;
                        return;
                    }
                });
                $rootScope.userInfo.subAccountTypeList = $rootScope.userInfo.subAccountTypeList = vm.model.subAccountTypeList;
                vm.input.transferSessionToken = data.transferSessionToken;
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
            vm.input.money = parseInt(vm.model.cashAmount / 1);
            moneyChanged();
            if (vm.input.money <= 0) {
                vm.input.money = null;
            }
        }

        function subAccountChanged(subAccountType){
            vm.input.subAccountTypeTo = subAccountType;
        }

        function confirm(){
            //if(vm.input.type == null || $.trim(vm.input.type) == '') {
            //    $scope.$emit('alertWarning', '请选操作类型');
            //}else if(vm.input.type != '1'){
            //    $scope.$emit('alertWarning', '功能开发中，敬请期待');
            //else
            if(vm.input.subAccountTypeTo == null || $.trim(vm.input.subAccountTypeTo) == ''){
                $scope.$emit('alertWarning', '请选择转移账户');
            }else if(vm.model.cashAmount<vm.input.money
                && vm.subAccountType == '0099'){
                $scope.$emit('alertWarning', '转移资金额超限');
            }else if(vm.model.cashAmount<vm.input.money
                && vm.subAccountType == '0001'){
                $scope.$emit('alertWarning', '转移股本额超限');
            //}else if(vm.model.transferLimit != null
            //    && vm.input.money > vm.model.transferLimit
            //    && vm.subAccountType == '0099') {
            //    $scope.$emit('alertWarning', '转移股本额高于最高额');
            //}else if(vm.model.transferLimit != null
            //    && vm.input.money < vm.model.transferLimit
            //    && vm.subAccountType == '0001') {
            //    $scope.$emit('alertWarning', '转移股本额低于最低额');
            }else if(vm.input.money <= 0){
                $scope.$emit('alertWarning', '转移额度过低');
            }else if(vm.input.money%1 != 0){
                $scope.$emit('alertWarning', '转移额度不能为小数');
            }else if(vm.input.payPassword == null || $.trim(vm.input.payPassword) == ''){
                $scope.$emit('alertWarning', '请输入交易密码');
            }else{
                $ionicLoading.show();
                vm.input.checkCode = vm.model.checkCode;
                vm.input.userId = vm.userId;
                vm.input.subAccountTypeFrom = vm.subAccountType;
                AccountService.transfer(
                    vm.input
                ).success(function (data) {
                    $ionicNativeTransitions.stateGo(vm.model.subAccountTypeText.split(',')[3], {subAccountType:vm.subAccountType}, {}, {
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