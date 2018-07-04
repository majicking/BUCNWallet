(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('PaymentAccountCtrl', PaymentAccountCtrl);

    PaymentAccountCtrl.$inject = ['$rootScope', '$sessionStorage', '$scope', '$localStorage','$ionicPopup', '$ionicLoading', 'AccountService', '$stateParams'];
    function PaymentAccountCtrl($rootScope, $sessionStorage, $scope, $localStorage,$ionicPopup, $ionicLoading, AccountService, $stateParams) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;
        vm.subAccountType = $stateParams.subAccountType;

        vm.model = {
            ydaySharedAmount: '0',
            totalSharedAmount: '0',
            cashAmount: '0',
            amount: '0',
            tradeAmount: '0',
            //isDrawWeekday: '0',
            isNomalBank:$rootScope.userInfo.isNomalBank,
            isEntBank:$rootScope.userInfo.isEntBank,
            bankUsed:$rootScope.userInfo.bankUsed,
            userType:$rootScope.userInfo.userType,
            isQiYe:$rootScope.userInfo.isQiYe
        };

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.flag = JSON.parse(localStorage.getItem(vm.userId + vm.subAccountType));
        if (vm.flag == null) {
            vm.flag = true;
            localStorage.setItem(vm.userId + vm.subAccountType, JSON.stringify(vm.flag));
        }

        vm.getAsset = getAsset;
        vm.doRefresh = doRefresh;
        //vm.popupDraw = popupDraw;
        vm.build = build;
        vm.display = display;
        vm.getAsset();

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        //$(document).bind('click',function(e){
        //    if ($scope.visible == true) {
        //        $scope.visible = false;
        //    }
        //})

        function getAsset(){
            $ionicLoading.show();
            AccountService.getAsset(
                vm.userId,
                vm.subAccountType
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.isNomalBank = $sessionStorage.userInfo.isNomalBank = vm.model.isNomalBank;
                $rootScope.userInfo.isEntBank = $sessionStorage.userInfo.isEntBank = vm.model.isEntBank;
                $rootScope.userInfo.bankUsed = $sessionStorage.userInfo.bankUsed = vm.model.bankUsed;
                $rootScope.userInfo.userType = $sessionStorage.userInfo.userType = vm.model.userType;
                $rootScope.userInfo.isQiYe = $sessionStorage.userInfo.isQiYe = vm.model.isQiYe;
                angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                    if (item.value == vm.subAccountType) {
                        item.text = vm.model.subAccountTypeText;
                        return;
                    }
                });
                $sessionStorage.userInfo.subAccountTypeList = $rootScope.userInfo.subAccountTypeList;
            }).error(function (error) {
            }).finally(function() {
                $ionicLoading.hide();
            });
        }

        function doRefresh(){
            AccountService.getAsset(
                vm.userId,
                vm.subAccountType
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.isNomalBank = $sessionStorage.userInfo.isNomalBank = vm.model.isNomalBank;
                $rootScope.userInfo.isEntBank = $sessionStorage.userInfo.isEntBank = vm.model.isEntBank;
                $rootScope.userInfo.bankUsed = $sessionStorage.userInfo.bankUsed = vm.model.bankUsed;
                $rootScope.userInfo.userType = $sessionStorage.userInfo.userType = vm.model.userType;
                $rootScope.userInfo.isQiYe = $sessionStorage.userInfo.isQiYe = vm.model.isQiYe;
                angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                    if (item.value == vm.subAccountType) {
                        item.text = vm.model.subAccountTypeText;
                        return;
                    }
                });

                if (document.getElementById("amount") != null) {
                    var countUp1 = new CountUp("amount", 0, vm.model.amount, 2, 1);
                    countUp1.start();
                }
                if (document.getElementById("cashAmount") != null) {
                    var countUp2 = new CountUp("cashAmount", 0, vm.model.cashAmount, 2, 1);
                    countUp2.start();
                }
                if (document.getElementById("ydaySharedAmount") != null) {
                    var countUp3 = new CountUp("ydaySharedAmount", 0, vm.model.ydaySharedAmount, 2, 1);
                    countUp3.start();
                }
            }).error(function (error) {
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        //function popupDraw() {
        //    var confirmPopup = null;
        //    if (vm.model.isBank == 0) {
        //        confirmPopup = $ionicPopup.alert({
        //            title: '提示',
        //            template: '<div class="text-center">没有绑定银行卡</div>',
        //            okText: '确认'
        //        });
        //    } else if (vm.model.isDrawWeekday==0 && vm.model.isBank==1) {
        //        confirmPopup = $ionicPopup.alert({
        //            title: '提示',
        //            template: '<div class="text-center">今天不是提现日</div>',
        //            okText: '确认'
        //        });
        //    }
        //    confirmPopup.then(function (res) {
        //    });
        //}

        function build() {
            $scope.$emit('alertWarning', '功能开发中，敬请期待');
        }

        //可见/不可见
        function display() {
            vm.flag = JSON.parse(localStorage.getItem(vm.userId + vm.subAccountType));
            if (vm.flag) {
                localStorage.setItem(vm.userId + vm.subAccountType, JSON.stringify(false));
                vm.flag = false;
            } else {
                localStorage.setItem(vm.userId + vm.subAccountType, JSON.stringify(true));
                vm.flag = true;
            }
        }
    }
})();