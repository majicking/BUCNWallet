/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('AgreementCtrl', AgreementCtrl);
    AgreementCtrl.$inject = ['$rootScope', '$scope', '$interval', '$ionicLoading', '$sce', '$ionicNativeTransitions', 'AgreementService'];
    function AgreementCtrl($rootScope, $scope, $interval, $ionicLoading, $sce, $ionicNativeTransitions, AgreementService) {
        var vm = this;
        vm.model = {};
        vm.showPage = false;
        get();
        function get() {
            $ionicLoading.show();
            AgreementService.get()
                .success(function (data) {
                    vm.model = data;
                    var content = '';
                    if ($scope.langKey == 'en') {
                        content = data.contentCh
                    } else {
                        content = data.contentEn
                    }
                    vm.model.content = $sce.trustAsHtml(content);
                    $ionicLoading.hide();
                    vm.showPage = true;
                }).error(function () {
                $ionicLoading.hide();
            });
        }
    }
})();