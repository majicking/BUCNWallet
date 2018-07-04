(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('AccountCtrl', AccountCtrl);
    AccountCtrl.$inject = ['$rootScope', '$sessionStorage', '$scope', '$localStorage', '$ionicLoading', '$ionicPopup', '$ionicNativeTransitions', 'AccountService','CoinService','$cordovaScanning'];
    function AccountCtrl($rootScope, $sessionStorage, $scope, $localStorage, $ionicLoading, $ionicPopup, $ionicNativeTransitions, AccountService,CoinService,$cordovaScanning) {
        var vm = this;
        vm.date = new Date();

        vm.memberId = $rootScope.userInfo.userId;
        vm.memberName = $rootScope.userInfo.memberName;
        vm.mobile = $rootScope.userInfo.mobile;
        vm.address = $rootScope.userInfo.walletaddressShow;
        vm.ifauthent = $rootScope.userInfo.isTrustName;
        vm.ifConnect = 0;
        vm.isInitialized = true;
        vm.listLength = 0;
        vm.items = [];
        vm.balanceModel = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        vm.page = {
            currentPage: 1,
            itemsPerPage: 10
        };
        vm.criteria = {
            userId: $rootScope.userInfo.userId
        };
        vm.flagTotal = JSON.parse(localStorage.getItem(vm.userId + 'total'));
        if (vm.flagTotal == null) {
            vm.flagTotal = true;
            localStorage.setItem(vm.userId + 'total', JSON.stringify(vm.flagTotal));
        }

        vm.flagList = JSON.parse(localStorage.getItem(vm.userId + 'list'));
        if (vm.flagList == null) {
            vm.flagList = true;
            localStorage.setItem(vm.userId + 'list', JSON.stringify(vm.flagList));
        }

        vm.doRefresh = doRefresh;
        vm.displayTotal = displayTotal;
        vm.displayList = displayList;
        vm.loadMore = loadMore;
        vm.scanner = scanner;

        var interval = window.setInterval(autoRefresh, 20000);
        $scope.$on("$destroy", function(){
            clearInterval(interval);
        });

        getAsset();
        //扫描
        function scanner(){
            $cordovaScanning.commont("scanner", "").then(function (barcodeData) {
                vm.isError = false;
                $ionicLoading.show();
                if (barcodeData != null && barcodeData != "") {
                    CoinService.checkAddress(
                        barcodeData,
                        vm.memberId
                    ).success(function (data) {
                        if (data == 'error') {
                            $scope.$emit('alertWarning', '不是有效地址二维码');
                        } else {
                            $ionicNativeTransitions.stateGo('tab.account-gopay', {address: data}, {}, {
                                "type": "slide",
                                "direction": "down"
                            });
                        }
                    }).error(function (error) {
                        $scope.$emit('alertWarning', '数据取得失败');
                    }).finally(function (error) {
                        $ionicLoading.hide();
                    });
                } else {
                    $scope.$emit('alertWarning', '不是有效地址二维码');
                }
            }, function (error) {
                $scope.$emit('alertWarning', error);
            })
        }

        function getAsset() {
            $ionicLoading.show();
            AccountService.getConnectState(
            ).success(function (data) {
                vm.getIfConnect = data;
                if (vm.ifConnect == 0 && vm.getIfConnect == 1) {
                    getBalance();
                } else if (vm.getIfConnect == 0) {
                    vm.items = [];
                    vm.page.currentPage = 1;
                    vm.listLength = 0;
                }
                vm.ifConnect =  vm.getIfConnect;
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
                //$scope.$broadcast('scroll.refreshComplete');
                vm.isInitialized = false;
            });
        }

        function getBalance() {
            AccountService.getBalance(
                vm.memberId
            ).success(function (data) {
                vm.balanceModel = data;
                if (document.getElementById("amount") != null) {
                    var countUp1 = new CountUp("amount", 0, vm.balanceModel.cashAmount, 8, 1);
                    countUp1.start();
                }
                getTradeListLength();
                getTradeList();
            }).error(function (error) {
            }).finally(function () {
            });
        }

        function getTradeListLength() {
            AccountService.getTradeListLength(
                vm.memberId
            ).success(function (data) {
                vm.listLength = data;
            }).error(function (error) {
            }).finally(function () {
            });
        }

        function getTradeList() {
            AccountService.getTradeList(1, vm.page.itemsPerPage, vm.criteria)
            .success(function (data) {
                vm.page = {
                    currentPage: 1,
                    itemsPerPage: 10
                }
                vm.items = [];
                if (data.length == 0) {
                    vm.hasMoreData = false;
                    vm.hasData = false;
                } else {
                    angular.forEach(data, function (item) {
                        vm.items.push(item);
                    });
                    vm.page.currentPage++;
                    if (data.length < vm.page.itemsPerPage) {
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    } else {
                        vm.hasMoreData = true;
                    }
                }
                if (vm.balanceModel.ifConnect != 1) {
                    vm.items = [];
                    vm.page = {
                        currentPage: 1,
                        itemsPerPage: 10
                    };
                    vm.hasMoreData = false;
                    vm.hasData = false;
                    vm.ifConnect = 0;
                }
            })
            .error(function (error) {
                vm.hasMoreData = false;
                vm.hasData = false;
            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        function autoRefresh() {
            refreshByState();
        }

        function doRefresh() {
            AccountService.getConnectState(
            ).success(function (data) {
                vm.getIfConnect = data;
                if (vm.getIfConnect == 1) {
                    getBalance();
                } else if (vm.getIfConnect == 0) {
                    vm.items = [];
                    vm.page.currentPage = 1;
                }
                vm.ifConnect =  vm.getIfConnect;
            }).error(function (error) {
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function loadMore() {
            AccountService.getTradeList(vm.page.currentPage, vm.page.itemsPerPage, vm.criteria)
            .success(function (data) {
                if(data.length==0){
                    vm.hasMoreData = false;
                    vm.hasData = false;
                }else{
                    angular.forEach(data, function (item) {
                        vm.items.push(item);
                    });
                    vm.page.currentPage++;
                    if(data.length<vm.page.itemsPerPage){
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    }else{
                        vm.hasMoreData = true;
                    }
                }
            })
            .error(function (error) {
                vm.hasMoreData = false;
                vm.hasData = false;
            }).finally(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        function refreshByState() {
            AccountService.getConnectState(
            ).success(function (data) {
                vm.getIfConnect = data;
                //if (vm.getIfConnect == 1) {
                //    getBalance();
                //} else {
                //    vm.model = [];
                //    vm.page.currentPage = 1;
                //    vm.listLength = 0;
                //}

                if (vm.ifConnect == 0 && vm.getIfConnect == 1) {
                    getBalance();
                } else if (vm.getIfConnect == 0) {
                    vm.items = [];
                    vm.page.currentPage = 1;
                    vm.listLength = 0;
                }
                vm.ifConnect =  vm.getIfConnect;
            }).error(function (error) {
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function displayTotal() {
            vm.flagTotal = JSON.parse(localStorage.getItem(vm.userId + 'total'));
            if (vm.flagTotal) {
                localStorage.setItem(vm.userId + 'total', JSON.stringify(false));
                vm.flagTotal = false;
            } else {
                localStorage.setItem(vm.userId + 'total', JSON.stringify(true));
                vm.flagTotal = true;
            }
        }

        function displayList() {
            vm.flagList = JSON.parse(localStorage.getItem(vm.userId + 'list'));
            if (vm.flagList) {
                localStorage.setItem(vm.userId + 'list', JSON.stringify(false));
                vm.flagList = false;
            } else {
                localStorage.setItem(vm.userId + 'list', JSON.stringify(true));
                vm.flagList = true;
            }
        }
    }
})();