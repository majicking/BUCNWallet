/**
 * Created by lifeng on 2016/1/20.
 */
(function () {
    'use strict';
    /* Controllers */
    angular.module('app').controller('RegisterCtrl', RegisterCtrl);
    RegisterCtrl.$inject = ['$rootScope', '$scope', '$stateParams', '$sessionStorage', '$ionicNativeTransitions', '$interval', '$ionicLoading', '$ionicPopup', '$state', 'UserService', '$translate','CoinService'];
    function RegisterCtrl($rootScope, $scope, $stateParams, $sessionStorage, $ionicNativeTransitions, $interval, $ionicLoading, $ionicPopup, $state, UserService, $translate,CoinService) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.phone = '';
        vm.code = '';
        vm.captcha = '';
        vm.reCaptcha = '';
        vm.captchaBtn = {
            disabled: false,
            label: $translate.instant('register.get_code')
        };
        getCode();
        vm.register = register;
        vm.clearForm = clearForm;
        vm.getCaptcha = getCaptcha;
        vm.getCode = getCode;
        vm.login = login;
        function getCode() {
            vm.codeUrl = 'http://www.bucncoin.com/api/authcode/index?t=' + new Date().getTime();
        }

        function register() {
            if (vm.username == null
                || $.trim(vm.username) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_username'));
                return;
            }
            if (vm.username.length < 6
                || vm.username.length > 20) {
                $scope.$emit('alertWarning', $translate.instant('register.username_length_is_incorrect'));
                return;
            }
            if (!((/^[A-Za-z0-9\u4e00-\u9fa5_-]+$/.test(vm.username)
                && !/^\d+$/.test(vm.username)))) {
                $scope.$emit('alertWarning', $translate.instant('register.username_format_is_incorrect'));
                return;
            }
            if (/^ZRJA\d+$/.test(vm.username.toUpperCase())) {
                $scope.$emit('alertWarning', $translate.instant('register.username_has_been_occupied'));
                return;
            }
            if (vm.password == null
                || $.trim(vm.password) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_input_password'));
                return;
            }
            var re = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
            if (!re.test(vm.password)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_password_format'));
                return;
            }
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_your_phone_number'));
                return;
            }
            re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_phone_number_format'));
                return;
            }
            if (vm.captcha == null
                || $.trim(vm.captcha) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_the_dynamic_code'));
                return;
            }
            $ionicLoading.show();
            CoinService.register(
                vm.username,
                vm.password,
                vm.phone,
                vm.captcha,
                vm.reCaptcha
            ).success(function (data) {
                var username = vm.username;
                var password = vm.password;
                vm.clearForm();
                vm.login(username, password);
            }).error(function (error) {
            }).finally(function () {
                $ionicLoading.hide();
            });
        }

        function login(username, password) {
            UserService.login(
                username,
                password
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
            })
        }
        var timePromise;
        var second = 180;

        function getCaptcha(verifyPhone) {
            if (vm.code == null
                || $.trim(vm.code) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_verification_code'));
                return;
            }
            if (vm.phone == null
                || $.trim(vm.phone) == '') {
                $scope.$emit('alertWarning', $translate.instant('register.please_enter_your_phone_number'));
                return;
            }
            var re = /^1\d{10}$/;
            if (!re.test(vm.phone)) {
                $scope.$emit('alertWarning', $translate.instant('register.incorrect_phone_number_format'));
                return;
            }
            UserService.getCaptcha(vm.phone, verifyPhone, vm.code).success(function (data) {
                vm.reCaptcha = data;
                changeCaptchaButton();
                timePromise = $interval(function () {
                    if (second == 0) {
                        initCaptchaButton(timePromise);
                    } else {
                        changeCaptchaButton();
                    }
                }, 1000);
            });
        }

        function clearForm() {
            vm.username = '';
            vm.password = '';
            vm.referralCode = '';
            vm.code = '';
            vm.phone = '';
            vm.captcha = '';
            vm.reCaptcha = '';
        }

        function initCaptchaButton() {
            vm.captchaBtn.disabled = false;
            vm.captchaBtn.label = $translate.instant('register.get_code');
            second = 180;
            $interval.cancel(timePromise);
        }

        function changeCaptchaButton() {
            vm.captchaBtn.disabled = true;
            vm.captchaBtn.label = $translate.instant('register.resend') + "(" + second + ")";
            second--;
        }
    }
})();