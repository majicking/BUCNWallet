
(function () {
    'use strict';

    angular.module('app').controller('PayResultCtrl', PayResultCtrl);
    PayResultCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', '$ionicNativeTransitions' ];
    function PayResultCtrl($rootScope, $scope, $stateParams, $ionicLoading, $ionicPopup, $ionicNativeTransitions) {
        var vm = this;
        vm.code = $stateParams.code;
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
    }
})();
