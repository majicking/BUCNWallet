/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('ManageCtrl', ManageCtrl);
    ManageCtrl.$inject = ['$rootScope', '$scope', '$ionicLoading', '$ionicPopup', '$sessionStorage', '$ionicNativeTransitions', 'AccountService', 'MstrService', 'UploadService', '$ionicHistory', 'UserService', '$cordovaScanning'];
    function ManageCtrl($rootScope, $scope, $ionicLoading, $ionicPopup, $sessionStorage, $ionicNativeTransitions, AccountService, MstrService, UploadService, $ionicHistory, UserService, $cordovaScanning) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {
            username: $rootScope.userInfo.username,
            truename: $rootScope.userInfo.truename,
            mobile: $rootScope.userInfo.mobile,
            isTrustName: $rootScope.userInfo.isTrustName,
            imgAddr: $rootScope.userInfo.imgAddr,
            walletaddressShow: $rootScope.userInfo.walletAddress,
            walletaddressUse: $rootScope.userInfo.walletAddressUse,
            publickey: $rootScope.userInfo.publicKey,
            privatekeyShow: $rootScope.userInfo.privateKey,
            //privateKeyUse: $rootScope.userInfo.privateKeyUse
        };

        var content = '';
        var cancel = '';
        var ok = '';

        vm.logout = logout;
        vm.getAccountInfo = getAccountInfo;
        vm.loginGoNativeBackParams = loginGoNativeBackParams;

        var clipboard = new Clipboard('.btn11');
        clipboard.on('success', function (e) {
            $scope.$emit('alertWarning', '复制成功');
        });

        getAccountInfo();

        function logout() {
            if ($scope.langKey == 'en') {
                content = '请确认退出登录';
                cancel = '取消';
                ok = '确认';
            } else {
                content = 'Please confirm logout';
                cancel = 'cancel';
                ok = 'confirm';
            }
            var confirmPopup = $ionicPopup.confirm({
                template: '<div class="text-center">' + content + '</div>',
                cancelText: cancel,
                okText: ok
            });
            confirmPopup.then(function (res) {
                if (res) {
                    if ($sessionStorage.isLogged) {
                        $rootScope.isLogged = $sessionStorage.isLogged = false;
                        delete $sessionStorage.userInfo;
                        $rootScope.userInfo = {};
                        delete $sessionStorage.token;
                        $rootScope.token = null;
                    }

                    loginGoNativeBackParams('password-gesture');
                    //$ionicNativeTransitions.stateGo('login', {}, {}, {
                    //    "type": "slide",
                    //    "direction": "up"
                    //});
                }
            });
        }

        //登录效验
        function loginGoNativeBackParams(state, params){
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
                    } else {
                        $ionicNativeTransitions.stateGo('login', {type:'login'}, {}, {
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
        }

        function getAccountInfo() {
            AccountService.getAccountInfo(
                vm.userId
            ).success(function (data) {
                vm.model.truename = $rootScope.userInfo.truename = data.name;
                vm.model.mobile =$rootScope.userInfo.mobile = data.mobile;
                vm.model.isTrustName =$rootScope.userInfo.isTrustName = data.isTrustName;
                vm.model.imgAddr = $rootScope.userInfo.imgAddr = data.imgAddr;
                vm.model.walletaddressShow = $rootScope.userInfo.walletAddress = data.walletAddress;
                vm.model.walletaddressUse = $rootScope.userInfo.walletAddressUse = data.walletAddressUse;
                //vm.model.privateKeyUse = $rootScope.userInfo.privateKeyUse = data.privateKeyUse;
                vm.model.publickey = $rootScope.userInfo.publicKey = data.publicKey;
                vm.model.privatekeyShow = $rootScope.userInfo.privateKey = data.privateKey;
                vm.model.username = $rootScope.userInfo.username = data.username;
            }).error(function (error) {
            }).finally(function (error) {
            });
        }
    }
})();