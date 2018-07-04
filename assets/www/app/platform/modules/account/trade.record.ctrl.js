
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('TradeRecordCtrl', TradeRecordCtrl);
    TradeRecordCtrl.$inject = ['$rootScope', '$scope', '$ionicHistory','$ionicPopup', '$ionicLoading', '$state', 'AccountService','$stateParams'];
    function TradeRecordCtrl($rootScope, $scope, $ionicHistory, $ionicPopup, $ionicLoading, $state, AccountService,$stateParams) {
        var vm = this;
        vm.id = $stateParams.id;

        vm.model = {};

        getInfo();

        function getInfo() {
            $ionicLoading.show();
            AccountService.getTradeInfo(
                vm.id
            ).success(function (data) {
                vm.model = data
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            });
        }
    }
})();