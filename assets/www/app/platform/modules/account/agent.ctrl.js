/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('AgentCtrl', AgentCtrl);

    AgentCtrl.$inject = ['$rootScope', '$scope', '$ionicLoading', '$ionicNativeTransitions','$ionicPopup', '$sessionStorage', 'UserService'];
    function AgentCtrl($rootScope, $scope, $ionicLoading, $ionicNativeTransitions, $ionicPopup, $sessionStorage, UserService) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.cmCode = '';

        vm.addCmCode = addCmCode;

        function addCmCode() {
            if (vm.cmCode == null || $.trim(vm.cmCode) == '') {
                $scope.$emit('alertWarning', '请输入代理商的推荐码');
                return;
            }else{
                UserService.validateCmCode(
                    vm.cmCode,
                    vm.userId
                ).success(function (message) {
                    if(message.code==1){
                        var confirmPopup = $ionicPopup.confirm({
                            title: '确认',
                            template: '<div class="text-center">您的代理商是'+message.data+'?</div>',
                            cancelText: '否',
                            okText: '是'
                        });
                        confirmPopup.then(function(res) {
                            if(res) {
                                $ionicLoading.show();
                                UserService.addCmCode(
                                    vm.userId,
                                    vm.cmCode
                                ).success(function (data) {
                                    $rootScope.userInfo.agentName = $sessionStorage.userInfo.agentName = data;
                                    //$scope.$emit('alertWarning', '添加推荐人成功,明日生效');
                                    $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                                        "type": "slide",
                                        "direction": "right"
                                    });
                                }).error(function (error) {
                                }).finally(function () {
                                    $ionicLoading.hide();
                                })
                            }
                        });
                    }else{
                        $scope.$emit('alertWarning', message.message);
                    }
                }).error(function (error) {
                }).finally (function(){
                    $ionicLoading.hide();
                });

            }
        }
    }
})();