(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$rootScope', '$scope', '$sessionStorage', '$ionicLoading', '$ionicNativeTransitions', 'UserService', '$state', '$translate', '$cordovaScanning', '$stateParams'];
    function LoginCtrl($rootScope, $scope, $sessionStorage, $ionicLoading, $ionicNativeTransitions, UserService, $state, $translate, $cordovaScanning, $stateParams) {
        var vm = this;
        vm.type = $stateParams.type;
        vm.username = '';
        vm.password = '';
        vm.login = login;
        vm.register = register;
        vm.clearForm = clearForm;
        vm.loginGoNativeBackParams = loginGoNativeBackParams;

        if (vm.type==undefined) {
            loginGoNativeBackParams('password-gesture');
        }

        //登录效验
        function loginGoNativeBackParams(state, params){
            window.setTimeout(function(){
                $cordovaScanning.commont("devices", "").then(function (data) {
                    $ionicLoading.show();
                    vm.uuid  = data;
                    //vm.uuid  = '111111';
                    UserService.isHavePattern(vm.uuid).success(function (data) {
                        localStorage.setItem('userPortrait', data.userPortrait);
                        $ionicLoading.hide();
                        if(data.havePattern){
                            $ionicNativeTransitions.stateGo(state, params, {}, {
                                "type": "slide",
                                "direction": "right"
                            });
                        }
                    }).error(function (error) {
                        $ionicLoading.hide();
                    })
                    //    .finally(function () {
                    //    $ionicLoading.hide();
                    //});
                });
            },500);
        }

        function login() {
            if (vm.username == null || $.trim(vm.username) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_username'));
                return;
            }
            if (vm.password == null || $.trim(vm.password) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_input_password'));
                return;
            }
            $ionicLoading.show();
            UserService.login(
                vm.username,
                vm.password
            ).success(function (data) {
                $rootScope.isLogged = $sessionStorage.isLogged = true;
                $rootScope.userInfo = $sessionStorage.userInfo = data;
                $rootScope.token = $sessionStorage.token = data.token;
                $ionicNativeTransitions.stateGo('tab.account', {}, {}, {
                    "type": "slide",
                    "direction": "down"
                });
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            })
        }

        function clearForm() {
            vm.username = '';
            vm.password = '';
        }

        function register() {
            $ionicNativeTransitions.stateGo('register', {}, {}, {
                "type": "slide",
                "direction": "down"
            });
        }
    }
})();