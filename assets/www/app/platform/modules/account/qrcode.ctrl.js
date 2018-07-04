/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('QrcodeCtrl', QrcodeCtrl);
    QrcodeCtrl.$inject = ['$rootScope', '$sessionStorage', '$state', '$ionicLoading', 'AccountService', '$stateParams', '$cordovaBarcodeScanner'];
    function QrcodeCtrl($rootScope, $sessionStorage, $state, $ionicLoading, AccountService, $stateParams, $cordovaBarcodeScanner) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;
        vm.model = {
            imgAddr: $rootScope.userInfo.imgAddr,
            username: $rootScope.userInfo.username,
            name: $rootScope.userInfo.name,
            walletaddress: $rootScope.userInfo.walletaddress
        };

        getAccountInfo();

        function getAccountInfo() {
            $ionicLoading.show();
            AccountService.getQrcode(
                vm.userId
            ).success(function (data) {
                vm.model = data;
                $rootScope.userInfo.imgAddr = $sessionStorage.userInfo.imgAddr = vm.model.imgAddr;
                $rootScope.userInfo.username = $sessionStorage.userInfo.username = vm.model.memberName;
                $rootScope.userInfo.name = $sessionStorage.userInfo.name = vm.model.memberTruename;
                $rootScope.userInfo.walletaddress = $sessionStorage.userInfo.walletaddress = vm.model.walletaddressShow;
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            });
        }
    }
})();