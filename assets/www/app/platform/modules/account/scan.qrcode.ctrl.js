/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app', ['ngCordova']).controller('ScanQrcodeCtrl', ScanQrcodeCtrl);
    ScanQrcodeCtrl.$inject = ['$rootScope', '$sessionStorage', '$state', '$ionicLoading', '$stateParams', '$cordovaBarcodeScanner', '$scope', '$ionicNativeTransitions','CoinService'];
    function ScanQrcodeCtrl($rootScope, $sessionStorage, $state, $ionicLoading, $stateParams, $cordovaBarcodeScanner, $scope, $ionicNativeTransitions,CoinService) {
        var vm = this;
        vm.isError = true;
        vm.userId = $rootScope.userInfo.userId;
        
        scan();
        
        function scan() {
            $cordovaBarcodeScanner.scan()
                .then(function (barcodeData) {
                    vm.isError = false;
                    if (barcodeData.text != "") {
                        CoinService.checkAddress(
                            barcodeData.text,
                            vm.userId
                        ).success(function (data) {
                            if (data == 'error') {
                                $ionicNativeTransitions.stateGo('tab.account', {}, {
                                    "type": "slide",
                                    "direction": "down"
                                });
                            } else {
                                $ionicNativeTransitions.stateGo('tab.account-gopay', {address: data}, {}, {
                                    "type": "slide",
                                    "direction": "down"
                                });
                            }
                        }).error(function (error) {
                        }).finally(function (error) {
                        });
                    } else {
                        $ionicNativeTransitions.stateGo('tab.account', {}, {
                            "type": "slide",
                            "direction": "down"
                        });
                    }
                }, function (error) {
                    if (isError) {
                        $ionicNativeTransitions.stateGo('tab.account', {}, {
                            "type": "slide",
                            "direction": "down"
                        });
                    }
                },
                {
                    preferFrontCamera : true, // iOS and Android
                    showFlipCameraButton : true, // iOS and Android
                    showTorchButton : true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt : "Place a barcode inside the scan area", // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations : true, // iOS
                    disableSuccessBeep: false // iOS and Android
                })
    }
    }
})();


