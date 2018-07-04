/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('GoPayCtrl', GoPayCtrl);
    GoPayCtrl.$inject = ['$rootScope', '$scope', '$sessionStorage', '$ionicLoading', '$state', 'AccountService', '$ionicHistory', '$stateParams', '$translate', '$ionicNativeTransitions','CoinService'];
    function GoPayCtrl($rootScope, $scope, $sessionStorage, $ionicLoading, $state, AccountService, $ionicHistory, $stateParams, $translate, $ionicNativeTransitions,CoinService) {
        var vm = this;

        vm.model = {};

        vm.input = {
            userIdFrom : $rootScope.userInfo.userId,
            toAddress : $stateParams.address != null ? $stateParams.address : '',
            userName :'',
            amount : '',
            payPassword : '',
            myRemark : '',
            sendRemark : '',
            checkCode : '',
            trueName: '',
            sendFromSessionToken : void 0
        };
        
        vm.commit = commit;
        vm.getTimes = getTimes;
        vm.getTimes();

        vm.getInfo = getInfo;
        vm.getInfo();

        function getInfo() {
            $ionicLoading.show();
            CoinService.getSendFromInfo(
                vm.input.userIdFrom
            ).success(function (data) {
                vm.model = data;
                vm.input.sendFromSessionToken = data.sendFromSessionToken;
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            })
        }
        
        function commit() {
            if (vm.input.toAddress == null
                || $.trim(vm.input.toAddress) == '') {
                $scope.$emit('alertWarning', $translate.instant('transfer.please_enter_transfer_address'));
                return;
            }
            if (vm.input.amount == null
                || $.trim(vm.input.amount) == '') {
                $scope.$emit('alertWarning', $translate.instant('transfer.please_enter_the_amount'));
                return;
            }
            if (vm.model.cashAmount <= vm.input.amount){
                $scope.$emit('alertWarning', $translate.instant('transfer.limit'));
                return;
            }
            if (vm.input.payPassword == null
                || $.trim(vm.input.payPassword) == '') {
                $scope.$emit('alertWarning', $translate.instant('transfer.please_enter_the_trade_password'));
                return;
            }
            // var rePrice = /^\d+\.?\d{0,8}$/;
            var rePrice = /^[0-9]+(.[0-9]{0,8})?$/;
            if (!rePrice.test(vm.input.amount)) {
                $scope.$emit('alertWarning', $translate.instant('transfer.please_enter_the_correct_amount'));
                return;
            }
            if (vm.input.myRemark.length > 100) {
                $scope.$emit('alertWarning', $translate.instant('transfer.my_remark_length'));
                return;
            }
            var re = /^[^\u4e00-\u9fa5]{0,}$/;
            if (!re.test(vm.input.myRemark)) {
                $scope.$emit('alertWarning', $translate.instant('transfer.my_remark_format'));
                return;
            }
            if (vm.input.sendRemark.length > 100) {
                $scope.$emit('alertWarning', $translate.instant('transfer.transfer_remark_length'));
                return;
            }
            if (!re.test(vm.input.sendRemark)) {
                $scope.$emit('alertWarning', $translate.instant('transfer.transfer_remark_format'));
                return;
            }
            $ionicLoading.show();
            vm.input.userName = vm.model.userName;
            vm.input.trueName = vm.model.trueName;
            vm.input.checkCode = vm.model.checkCode;
            CoinService.sendFrom(
                vm.input
            ).success(function (data) {
                $ionicNativeTransitions.stateGo('tab.account-send-from-result', {
                    id:data
                }, {}, {
                    "type": "slide",
                    "direction": "right"
                });
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
        function getTimes() {
            $ionicLoading.show();
            AccountService.getTimes(
            ).success(function (data) {
                if (data == null) {
                    vm.times="0";
                }
                else {
                    vm.times=data;
                }
            }).error(function (error) {
               
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
    }
})();