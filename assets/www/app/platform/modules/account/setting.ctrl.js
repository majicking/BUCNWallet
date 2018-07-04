/**
 * Created by zhoujin on 2017/9/21.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('SettingCtrl', SettingCtrl);
    SettingCtrl.$inject = ['$rootScope', '$scope', '$ionicHistory', '$ionicPopup', '$ionicLoading', '$ionicNativeTransitions', 'AccountService', '$sessionStorage', 'UploadService', '$translate'];
    function SettingCtrl($rootScope, $scope, $ionicHistory, $ionicPopup, $ionicLoading, $ionicNativeTransitions, AccountService, $sessionStorage, UploadService, $translate) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;

        vm.model = {
            isTrustName:$rootScope.userInfo.isTrustName,
            username:$rootScope.userInfo.username,
            mobile:$rootScope.userInfo.mobile,
            imgAddr:$rootScope.userInfo.imgAddr,
            name:$rootScope.userInfo.truename,
            idCard:$rootScope.userInfo.idCard
        };

        vm.criteria = {
            provinceId: null,
            cityId: null
        }

        vm.cityList = [];
        vm.provinceId = null;
        vm.searchString = "";

        vm.imgUpload = imgUpload;
        vm.build = build;
        vm.searchByCityName = searchByCityName;
        vm.logout = logout;

        getAccountInfo();

        function getAccountInfo() {
            AccountService.getAccountInfo(
                vm.userId
            ).success(function (data) {
                vm.model.isTrustName = $rootScope.userInfo.isTrustName = $sessionStorage.userInfo.isTrustName = data.isTrustName;
                vm.model.username = $rootScope.userInfo.username = $sessionStorage.userInfo.username = data.username;
                vm.model.mobile = $rootScope.userInfo.mobile = $sessionStorage.userInfo.mobile = data.mobile;
                vm.model.imgAddr = $rootScope.userInfo.imgAddr = $sessionStorage.userInfo.imgAddr = data.imgAddr;
                vm.model.name = $rootScope.userInfo.truename = $sessionStorage.userInfo.truename = data.name;
                vm.model.idCard = $rootScope.userInfo.idCard = $sessionStorage.userInfo.idCard = data.idCard;
            }).error(function (error) {
            }).finally(function (error) {
            });
        }
        function resetSelectedStatus() {
            angular.forEach(vm.model, function (province) {
                province.isSelected = false;
            });
        }

        var imgUploader = $scope.imgUploader = UploadService.init(1);
        /*listUploader.removeAfterUpload = true;*/
        imgUploader.onAfterAddingFile = function (item) {
            imgUploader.uploadItem(item);
        };

        imgUploader.onSuccessItem = function (fileItem, response, status, headers) {
            vm.model.imgAddr = response.data.url;
            imgUploader.clearQueue();
            vm.imgUpload();
        };

        imgUploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.$emit("alertWarning", response.message);

            //$scope.$emit("error", $translate.instant('setting.error'), $translate.instant('setting.the_system_is_busy'));
            imgUploader.clearQueue();
        };

        function imgUpload() {
            $ionicLoading.show();
            AccountService.imgUpload(
                vm.userId,
                vm.model.imgAddr
            ).success(function (data) {
                $rootScope.userInfo.imgAddr = $sessionStorage.userInfo.imgAddr = vm.model.imgAddr;
            }).error(function (error) {
            }).finally(function (error) {
                $ionicLoading.hide();
            });
        }
        function logout() {
            if ($sessionStorage.isLogged) {
                $rootScope.isLogged = $sessionStorage.isLogged = false;
                delete $sessionStorage.userInfo;
                $rootScope.userInfo = {};
                delete $sessionStorage.token;
                $rootScope.token = null;
            }
            $ionicNativeTransitions.stateGo('login', {}, {}, {
                "type": "slide",
                "direction": "up"
            });
        }
        function searchByCityName() {
            if (vm.searchString == "") {
                return;
            }
            var ifExist = false;
            angular.forEach(vm.model, function (province) {
                angular.forEach(province.cityList, function (city) {
                    if (RegExp(vm.searchString).test(city.cityName) || RegExp(city.cityName).test(vm.searchString)) {
                        resetSelectedStatus();
                        vm.cityList = province.cityList;
                        province.isSelected = true;
                        vm.provinceId = provinceId;
                        ifExist = true;
                        return;
                    }
                });
            });
            if (!ifExist) {
                $scope.$emit("alertWarning", '未找到相关检索');
            }
            else {
                $scope.$broadcast('scroll.refreshComplete');
            }
        }
        function build() {
            $scope.$emit("alertWarning", $translate.instant('setting.building'));
        }
    }
})();
/**
 * Created by zhoujin on 2017/9/21.
 */
