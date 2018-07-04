(function () {
    'use strict';

    /* Controllers */
    angular.module('app').controller('PaymentSeqListCtrl', PaymentSeqListCtrl);

    PaymentSeqListCtrl.$inject = ['$rootScope', '$stateParams', '$scope', '$ionicLoading', 'AccountService', 'MstrService'];
    function PaymentSeqListCtrl($rootScope, $stateParams, $scope, $ionicLoading, AccountService, MstrService) {
        var vm = this;
        vm.subAccountType = $stateParams.subAccountType;
        vm.back = $stateParams.back;

        vm.model = {};

        angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
            if (item.value == vm.subAccountType) {
                vm.model.subAccountTypeText = item.text;
                return;
            }
        });

        vm.items = [];
        vm.hasMoreData = false;
        vm.hasData = true;
        vm.page = {
            currentPage: 1,
            itemsPerPage: 10
        }

        vm.criteria = {
            userId: $rootScope.userInfo.userId,
            subAccountType : vm.subAccountType,
            seqType: 0
        }

        vm.selectType = {value: 0, text: '全部'};

        vm.loadMore = loadMore;
        vm.doRefresh = doRefresh;
        vm.selectItem = selectItem;

        $scope.visible = false;
        $scope.moreToggle = function(){
            $scope.visible = !$scope.visible;
        }

        getMasterList('SELECT_TYPE');

        getList();

        function getList() {
            $ionicLoading.show();
            doRefresh();
        }

        function doRefresh() {
            vm.criteria.seqType = vm.selectType.value;
            AccountService.getPaymentSeqlist(1, vm.page.itemsPerPage, vm.criteria)
                .success(function (data) {
                    vm.model = data;
                    angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                        if (item.value == vm.subAccountType) {
                            item.text = vm.model.subAccountTypeText;
                            return;
                        }
                    });
                    vm.page = {
                        currentPage: 1,
                        itemsPerPage: 10
                    }
                    vm.items = [];
                    if (vm.model.subAccountSeqModelList.length == 0) {
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    } else {
                        angular.forEach(vm.model.subAccountSeqModelList, function (item) {
                            vm.items.push(item);
                        });
                        vm.page.currentPage++;
                        if (vm.model.subAccountSeqModelList.length < vm.page.itemsPerPage) {
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        } else {
                            vm.hasMoreData = true;
                        }
                    }
                })
                .error(function (error) {
                    vm.hasMoreData = false;
                    vm.hasData = false;
                }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        }

        function loadMore() {
            vm.criteria.seqType = vm.selectType.value;
            AccountService.getPaymentSeqlist(vm.page.currentPage, vm.page.itemsPerPage, vm.criteria)
                .success(function (data) {
                    vm.model = data;
                    angular.forEach($rootScope.userInfo.subAccountTypeList, function (item) {
                        if (item.value == vm.subAccountType) {
                            item.text = vm.model.subAccountTypeText;
                            return;
                        }
                    });
                    if (vm.model.subAccountSeqModelList.length == 0) {
                        vm.hasMoreData = false;
                        vm.hasData = false;
                    } else {
                        angular.forEach(vm.model.subAccountSeqModelList, function (item) {
                            vm.items.push(item);
                        });
                        vm.page.currentPage++;
                        if (vm.model.subAccountSeqModelList.length < vm.page.itemsPerPage) {
                            vm.hasMoreData = false;
                            vm.hasData = false;
                        } else {
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

        function selectItem(item) {
            vm.selectType = item;
            $ionicLoading.show();
            doRefresh();
        }

        function getMasterList(type) {
            MstrService.getMasterList(type)
                .success(function (data) {
                    switch (type) {
                        case 'SELECT_TYPE' :
                            vm.selectTypes = data.list;
                            break;
                    }
                }).error(function () {
            });
        }
    }
})();