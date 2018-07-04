/**
 * Created by zhoujin on 2017/11/16.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('SendFromResultCtrl', SendFromResultCtrl);
    SendFromResultCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicLoading', '$state', 'AccountService'];
    function SendFromResultCtrl($rootScope, $scope, $stateParams, $ionicLoading, $state, AccountService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;
        vm.subAccountTypeText = '0'
        vm.id = $stateParams.id;
        vm.model = {};
        vm.showPage = false;
        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        getResult();

        function getResult(){
            $ionicLoading.show();
            AccountService.getSendFromResult(
                vm.id
            ).success(function (data) {
                vm.model = data;
                angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                    if (item.value == vm.subAccountType) {
                        item.text = vm.model.subAccountTypeText;
                        return;
                    }
                });
                vm.showPage = true;
            }).error(function (error) {
            }).finally(function() {
                $ionicLoading.hide();
            });
        }
    }
})();