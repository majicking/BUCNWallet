/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('VerifyCtrl', VerifyCtrl);
    VerifyCtrl.$inject = ['$rootScope', '$scope', '$sessionStorage', '$ionicLoading', '$state', 'UserService', '$translate', '$ionicNativeTransitions'];
    function VerifyCtrl($rootScope, $scope, $sessionStorage, $ionicLoading, $state, UserService, $translate, $ionicNativeTransitions) {
        var vm = this;
        vm.userId = $rootScope.userInfo.userId;
        vm.verifyType = 'left';
        vm.placeholderName = '真实姓名';
        vm.placeholderIdCard = '身份证/护照';
        vm.model = {
            name: $rootScope.userInfo.name,
            idCard: $rootScope.userInfo.idCard,
            bizCredentialName: $rootScope.userInfo.bizCredentialName,
            bizLicenseNo: $rootScope.userInfo.bizLicenseNo
        };
        vm.verify = verify;
        vm.clearForm = clearForm;
        vm.verifyChanged = verifyChanged;
        function verify() {
            if (vm.verifyType == 'left') {
                if (vm.model.name == null
                    || $.trim(vm.model.name) == '') {
                    $scope.$emit('alertWarning', $translate.instant('verify.please_enter_your_name'));
                    return;
                }
                //身份证(18位身份证号码)
                var regIdCard = new RegExp("^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$");
                if (vm.model.idCard == null
                    || $.trim(vm.model.idCard) == ''
                    || !regIdCard.test(vm.model.idCard)) {
                    $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_ID_number'));
                    return;
                }
                $ionicLoading.show();
                UserService.verify(
                    vm.userId,
                    vm.model.name,
                    vm.model.idCard
                ).success(function (data) {
                    vm.model = data;
                    $rootScope.userInfo.name = $sessionStorage.userInfo.name = vm.model.name;
                    $rootScope.userInfo.idCard = $sessionStorage.userInfo.idCard = vm.model.idCard;
                    $rootScope.userInfo.isTrustName = $sessionStorage.userInfo.isTrustName = vm.model.isTrustName;
                    $ionicLoading.hide();
                    $ionicNativeTransitions.stateGo('tab.manage', {}, {}, {
                        "type": "slide",
                        "direction": "down"
                    });
                }).error(function (error) {
                    $ionicLoading.hide();
                });
            } else {
                if (vm.model.bizCredentialName == null
                    || $.trim(vm.model.bizCredentialName) == '') {
                    $scope.$emit('alertWarning', '请输入法人名');
                    return;
                }
                var regIdCard = new RegExp("^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$");
                if (vm.model.idCard == null
                    || $.trim(vm.model.idCard) == ''
                    || !regIdCard.test(vm.model.idCard)) {
                    $scope.$emit('alertWarning', $translate.instant('verify.please_enter_the_ID_number'));
                    return;
                }
                if (vm.model.name == null
                    || $.trim(vm.model.name) == '') {
                    $scope.$emit('alertWarning', '请输入公司名');
                    return;
                }
                if (vm.model.bizLicenseNo == null
                    || $.trim(vm.model.bizLicenseNo) == '') {
                    $scope.$emit('alertWarning', '请输入营业执照号');
                    return;
                }
                $ionicLoading.show();
                UserService.verifyForQiYe(
                    vm.userId,
                    vm.model.name,
                    vm.model.idCard,
                    vm.model.bizCredentialName,
                    vm.model.bizLicenseNo
                ).success(function (data) {
                    vm.model = data;
                    $rootScope.userInfo.name = $sessionStorage.userInfo.name = vm.model.name;
                    $rootScope.userInfo.idCard = $sessionStorage.userInfo.idCard = vm.model.idCard;
                    $rootScope.userInfo.bizCredentialName = $sessionStorage.userInfo.bizCredentialName = vm.model.bizCredentialName;
                    $rootScope.userInfo.bizLicenseNo = $sessionStorage.userInfo.bizLicenseNo = vm.model.bizLicenseNo;
                    $rootScope.userInfo.isTrustName = $sessionStorage.userInfo.isTrustName = vm.model.isTrustName;
                    $ionicLoading.hide();
                    $ionicNativeTransitions.stateGo('tab.account', {}, {}, {
                        "type": "slide",
                        "direction": "down"
                    });
                }).error(function (error) {
                    $ionicLoading.hide();
                });
            }
        }
        function verifyChanged(verifyType) {
            if (verifyType == 'left') {
                vm.placeholderName = '真实姓名';
                vm.placeholderIdCard = '身份证号';
            } else {
                vm.placeholderName = '公司名';
                vm.placeholderIdCard = '法人证件号';
            }
            vm.verifyType = verifyType;
        }
        function clearForm() {
            vm.model.name = '';
            vm.model.idCard = '';
            vm.model.bizCredentialName = '';
            vm.model.bizLicenseNo = '';
        }
    }
})();